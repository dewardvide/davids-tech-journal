---
title: "Finding the Limit of Local AI with 24 GB of VRAM"
date: "2026-08-19"
summary: "How far a local agent gets on a single 24 GB GPU - conversation, tool use and memory worked well across three models; long-horizon coding is where it broke down."
topics: ["AI/ML", "LLM OPS"]
readTime: "5 min read"
---
I wanted to find out how far I could realistically push a local AI agent on a single 24 GB GPU.

I wasn't interested in benchmarks. I wanted to know whether local models could handle the kind of agent workflow I actually care about: maintaining a conversation, using tools, searching the web, recalling and updating memory, and doing practical coding work.

My agent had access to web search and a Markdown-based memory system, with tools for recalling and updating those memories. For inference, I tested three models:

- GPT-OSS-20B
- IBM Granite 4.1 8B
- Qwen3 14B AWQ

I deliberately stopped there. Larger models could potentially be squeezed into 24 GB through heavier quantization or offloading, but for an agent, the model weights are only part of the memory equation - I also needed enough VRAM left over for a useful context window.

## The setups

I served all three models with vLLM.

For Qwen3 14B AWQ, I optimized aggressively for context:

```
vllm serve Qwen/Qwen3-14B-AWQ \
  --host 0.0.0.0 \
  --port 8000 \
  --enable-auto-tool-choice \
  --enable-prefix-caching \
  --gpu-memory-utilization 0.92 \
  --hf-overrides '{"rope_parameters": {"rope_type":"yarn","factor":4.0,"original_max_position_embeddings":32768}}' \
  --kv-cache-dtype fp8 \
  --max-model-len 131072 \
  --reasoning-parser deepseek_r1 \
  --tool-call-parser hermes
```

Granite 4.1 8B ran with a much smaller context:

```
vllm serve ibm-granite/granite-4.1-8b \
  --host 127.0.0.1 \
  --port 8000 \
  --enable-auto-tool-choice \
  --gpu-memory-utilization 0.92 \
  --max-model-len 21000 \
  --tool-call-parser granite4
```

GPT-OSS-20B sat between the two:

```
vllm serve openai/gpt-oss-20b \
  --host 127.0.0.1 \
  --port 8000 \
  --enable-prefix-caching \
  --gpu-memory-utilization 0.85 \
  --max-model-len 65536 \
  --tool-call-parser openai
```

In practice, the number that mattered most wasn't parameter count - it was how much usable context remained once the model was loaded.

## Conversation and tool use worked surprisingly well

Granite and Qwen both impressed me here. They could hold a coherent conversation, decide when to call tools, search the web, recall information from Markdown memory files, and update those memories when appropriate.

This was the most encouraging result of the experiment: for conversational assistants, knowledge-base agents, and relatively bounded tool-driven workflows, local models on 24 GB already felt genuinely useful.

Then I tried coding.

## Coding exposed the limit

I used OpenCode for the coding tests. The task was straightforward: take a dataset and build a Jupyter Notebook using Pandas and Scikit-learn to inspect and clean it. I also gave the agent a detailed coding skill of roughly 10,000 tokens, to see whether strong procedural instructions could help smaller models perform more reliably.

The result was disappointing.

GPT-OSS-20B was effectively unusable in this setup - its tool calls were frequently malformed or didn't match the expected schema, breaking the agent loop before it could make real progress.

Granite and Qwen could actually work with OpenCode, but neither managed the task well.

For Granite, the problem was context. With a 21k-token limit, a 10k-token skill consumed almost half the available window before any meaningful coding had started. What was left had to hold tool definitions, notebook contents, errors, previous attempts, and conversation history - not enough for a long coding loop.

Qwen had the opposite problem. With a configured 131k context, it had plenty of room to keep working. After some time (15-30 mins I think), one session reached roughly 90,000 tokens before context compaction kicked in. I went back through what it had accomplished during those 90,000 tokens: it still hadn't produced a Jupyter Notebook that ran from beginning to end without errors, it was still fumbling.

That was the point where I stopped the experiment and called it the practical limit.

## Why I didn't just load a bigger model

It's tempting with local inference to ask: what's the biggest model I can fit on my GPU?

For agent workloads, I think the better question is: what's the largest model I can run while still leaving enough context for the task?

Coding agents consume context fast - system prompts, tool schemas, skills, source files, command output, errors, patches, and previous attempts all stack up. A larger model that leaves almost no room for KV cache can end up less useful than a smaller one with a generous context window. But Qwen also showed that context alone doesn't solve the problem: I had plenty of room, but not enough model capability to make good use of it.

## Where I landed

My tests left me with a fairly clear boundary. On 24 GB of VRAM, I was very happy with local models for:

- conversational agents
- persistent Markdown-based memory
- web search and knowledge retrieval
- function calling
- relatively short, bounded tool-driven workflows

I was much less impressed by long-horizon autonomous coding. The infrastructure worked - the models could call tools, the memory system worked, and with Qwen I had a genuinely large working context. What broke down was the model's ability to plan, debug, recover from mistakes, and keep making useful progress over a long session.

So for me, the limit of local AI on 24 GB wasn't getting an agent running. It was getting that agent to stay competent long enough to finish complex work - and 90,000 tokens into a notebook that still wouldn't run was a pretty good place to draw that line.

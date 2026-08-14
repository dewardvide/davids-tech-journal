/* Monthly snapshots of the AI stack.
 *
 * Adding a month = appending one StackMonth object. Nothing else. The page
 * computes what changed by comparing consecutive snapshots, so there is no
 * changelog to keep in sync — write the stack as it is, and the diff follows.
 *
 * Unlike the journal, this is an imported TS module rather than markdown on
 * disk: it is structured data, not prose, and typing it means a mistyped key
 * fails the build instead of rendering blank. See lib/ai-stack.ts.
 *
 * Group headings are sentence case here; the render uppercases them, because
 * uppercase belongs to the mono layer, not to the content.
 */

export type StackItem = {
  name: string;
  href?: string;
  /** A muted aside after the name — why it is here, or what it is. */
  note?: string;
};

export type StackGroup = {
  heading: string;
  items: StackItem[];
};

export type StackCategory = {
  heading: string;
  groups: StackGroup[];
};

export type StackMonth = {
  /** "2026-08". Also the URL segment at /ai-stack/2026-08. */
  month: string;
  intro: string;
  categories: StackCategory[];
};

export const STACKS: StackMonth[] = [
  {
    month: '2026-08',
    intro:
      'A comprehensive outline of the AI hardware and software I’m currently working with.',
    categories: [
      {
        heading: 'Hardware',
        groups: [
          { heading: 'GPU', items: [{ name: 'Nvidia RTX 3090' }] },
          { heading: 'CPU', items: [{ name: 'Ryzen 5 5600' }] },
          { heading: 'RAM', items: [{ name: '16GB DDR4' }] },
        ],
      },
      {
        heading: 'Software',
        groups: [
          {
            heading: 'Inference',
            items: [
              { name: 'vLLM', href: 'https://vllm.ai' },
              { name: 'llama.cpp', href: 'https://github.com/ggml-org/llama.cpp' },
              { name: 'vllm-ctl', href: 'https://github.com/dewardvide/vllm-ctl' },
            ],
          },
          {
            heading: 'Fine tuning',
            items: [
              { name: 'llama.cpp', href: 'https://github.com/ggml-org/llama.cpp' },
              { name: 'unsloth', href: 'https://unsloth.ai' },
            ],
          },
          {
            heading: 'Quantisation',
            items: [
              { name: 'llama.cpp', href: 'https://github.com/ggml-org/llama.cpp' },
              { name: 'LLM Compressor', href: 'https://github.com/vllm-project/llm-compressor' },
            ],
          },
          {
            heading: 'AI services',
            items: [
              { name: 'Claude', note: 'Pro subscription' },
              { name: 'ChatGPT', note: 'Plus subscription' },
              { name: 'OpenRouter' },
            ],
          },
          {
            heading: 'Agents',
            items: [
              { name: 'Claude Code' },
              { name: 'OpenCode' },
              { name: 'Demerzel', note: 'not public — my home-built personal agent' },
            ],
          },
          {
            heading: 'Models of interest',
            items: [
              {
                name: 'ibm-granite/granite-4.1-8b',
                href: 'https://huggingface.co/ibm-granite/granite-4.1-8b',
              },
              { name: 'Qwen/Qwen3.6-27B', href: 'https://huggingface.co/Qwen/Qwen3.6-27B' },
              {
                name: 'DeepSeek V4 Flash',
                href: 'https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731',
              },
            ],
          },
          {
            heading: 'SDKs, MCP and other',
            items: [{ name: 'MCP UI', href: 'https://github.com/MCP-UI-Org/mcp-ui' }],
          },
        ],
      },
    ],
  },
];

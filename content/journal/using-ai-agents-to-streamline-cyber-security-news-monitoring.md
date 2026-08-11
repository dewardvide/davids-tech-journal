---
title: "Using AI Agents to Streamline Cyber Security News Monitoring"
date: "2025-05-18"
summary: "In the ever-changing cyber landscape, it is crucial for cybersecurity professionals to stay informed about evolving technologies and emerging threats. This involves engaging with a wide array of content sources."
topics: ["AI/ML", "AUTOMATION"]
readTime: "5 min read"
---
In the ever-changing cyber landscape, it is crucial for cybersecurity professionals to stay informed about evolving technologies and emerging threats. This involves engaging with a wide array of content sources, including articles, research papers, educational YouTube videos, social media posts, and podcasts. Personally, I've found articles to be the best source of information simply due to the wide variety of trustworthy sources of information such as vendor blogs. Additionally, it's easier to follow citations in written work compared to podcasts where they may not be explicitly provided. Keeping track of news in a rapidly evolving field such as Cyber Security can at times be overwhelming. This challenge led me to explore the application of AI and automation to streamline the process.

In this article, I will showcase an AI powered workflow I use both to keep track of Cyber Security News as well as automatically share interesting news articles on my Social Media platforms.

### Objectives

The objectives of the automated workflow are as follows:

-   Summarize cyber security news articles of interest and present them in an accessible and easily digestible format
-   Draft accurate summaries that will be posted on my social media page

### System Overview

I used Make.com (Make) to create my Automated workflow. Make is a no-code SaaS automation platform that allows you to build automated workflows ("scenarios") through an intuitive drag and drop interface. One of the key benefits of Make is that it comes with a wide variety of prebuilt connectors that allow you to connect popular apps, services and data sources. Make offers several pricing tiers, including a free plan that supports up to two scenarios and 1,000 operations.

Below is a visual overview of the workflow I created:

![The complete Make.com automated workflow for cyber security news monitoring and posting.](/images/blog/using-ai-agents-to-streamline-cyber-security-news-monitoring/workflow.png)

_The Workflow_

Here's how it works in detail:

-   **An article is added to a Feedly Board**

Feedly is a news aggregator that allows you to follow, read and organize news from multiple news sources such as RSS feeds and blog posts. Adding an article to a designated "news board" (folder) queues it for automated processing.

-   **News Summary Generation**

![The News Summary Generation branch of the Make.com workflow.](/images/blog/using-ai-agents-to-streamline-cyber-security-news-monitoring/news-summary-branch.png)

_News Summary Generation Branch_

In this branch, the news item would be passed to a ChatGPT chat completion function and concatenated into an API request along with a tailored system and user prompt. The news item will then be posted on a personal discord server and I would get a notification.

![Example summary notification delivered to Discord showing a formatted cyber security news summary.](/images/blog/using-ai-agents-to-streamline-cyber-security-news-monitoring/discord-notification.png)

_Example Summary Notification on Discord_

-   **Post Generation**

I run a LinkedIn page for Cleon Labs where I post summaries and commentaries of news articles I find interesting. A lot of the times, I would read an article and I would not have the time to summarize it. Therefore, I decided to automate the process of draft creation as shown below:

![The Post Generation branch of the Make.com workflow showing the multi-agent drafting process.](/images/blog/using-ai-agents-to-streamline-cyber-security-news-monitoring/post-generation-branch.png)

_Post Generation Branch_

Here's a detailed workflow:

a. The news item is first handled by a ChatGPT-4o agent that functions as a writer tasked with producing a summary fit for a LinkedIn post.

b. The initial draft is posted to a dedicated Discord channel for tracking. This step helped assess the quality of initial drafts against the final outputs -- though, in practice, the reviewed versions have consistently proven superior.

c. The draft is then reviewed by a second editor agent running the more advanced ChatGPT o3-mini model. This reviewer checks for fidelity to the original article, clarity, and conciseness.

d. Lastly, the final draft is parsed and sent over to Discord. I go through it and if it meets my expectations, it is posted on my LinkedIn page. Below is an example post:

![Example of a generated post delivered to Discord for review before publishing.](/images/blog/using-ai-agents-to-streamline-cyber-security-news-monitoring/discord-post.png)

_Example Post on Discord_

![Example of the final post published on LinkedIn.](/images/blog/using-ai-agents-to-streamline-cyber-security-news-monitoring/linkedin-post.png)

_Example Post on LinkedIn_

### Challenges and Solutions

The primary challenge was ensuring that the AI agents generated accurate, high-quality summaries. This was resolved through multiple rounds of prompt engineering and tinkering with parameters such as temperature. For optimum results I recommend the following:

-   **Multiple-shot prompting** - this involves giving the agent multiple examples with inputs and desired outputs
-   **Use Low Temperature** - simply put, temperature is a parameter that determines the randomness of an LLM's output. Lowering the temperature ensures a more deterministic output which is ideal for tasks such as ours - which require accuracy and consistency.

### Conclusion

The integration of AI and no-code automation has significantly enhanced my ability to stay current with cybersecurity developments while reducing manual effort. By building a multi-agent workflow with tools like Make.com, Feedly, Discord, and OpenAI's GPT models, I've established a scalable system that not only tracks cybersecurity news but also creates and curates professional summaries for public sharing. This setup not only improves personal productivity but also contributes to the broader cybersecurity community by promoting accessible, high-quality content. As AI tools continue to mature, there's immense potential to expand this approach into other areas of threat intelligence, research dissemination, and professional knowledge sharing.

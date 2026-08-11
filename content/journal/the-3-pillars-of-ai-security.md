---
title: "The 3 Pillars of AI Security"
date: "2026-01-17"
summary: "Against this backdrop, it is increasingly clear that a sober, critical reflection on the core pillars of AI security is required if we are to prepare ourselves for this largely uncharted territory."
topics: ["SECURITY", "AI/ML"]
readTime: "8 min read"
---
At this point in time, there's no need to emphasize the rapid developments in AI. Artificial intelligence is already embedded in our daily lives and business operations, and whether we welcome it or not, it is here to stay. Whether AI represents a bubble is a question for economists; in practice, organizations are already reliant on the efficiency gains it delivers. As a result, businesses are integrating AI into their processes wherever it is feasible to do so.

As a Cyber Security Specialist, I am constantly bombarded with new technologies, emerging regulations, evolving technological frameworks and an ever growing list of buzzwords. Both large and small vendors are emerging with promises of silver bullet solutions that will ensure your AI Security problems will go away. Against this backdrop, it is increasingly clear that a sober, critical reflection on the core pillars of AI security is required if we are to prepare ourselves for this largely uncharted territory.

* * *

## AI Governance

[PwC](https://www.pwc.de/en/risk-regulatory/responsible-ai/governance-of-artificial-intelligence-as-a-value-driver.html) describes AI governance as "the framework and processes that set strategy and objectives, guide the responsible development and deployment, and use of AI in organizations."

In practice this entails the following:

**Accountability and Ownership** - Ownership of the overall AI ecosystem, as well as of individual AI systems, must be clearly defined. Roles and responsibilities across the AI lifecycle should also be explicit. This ensures accountability, clear escalation paths, and structured decision-making in the event of AI-related incidents or risk assessments.

**Risk Management** - AI systems introduce both security-related and non-security-related risks. Issues such as model drift or regulatory non-compliance may not always fall under traditional security categories, while threats like prompt injection clearly do. This distinction necessitates specialized processes that systematically identify, assess, and manage AI risks, and that are tightly integrated into the AI development and deployment lifecycle.

**AI Governance Committees** - These are cross-function governance bodies play a critical role in overseeing AI initiatives. They help ensure alignment with organizational strategy, ethical principles, and regulatory obligations. Because AI risks extend beyond security alone, strong internal coordination is essential for consistent risk identification and remediation.

**Lifecycle Controls** - Having robust, and if possible, automated controls that ensure that AI systems introduced to an environment are inventoried, assigned owners, designed, developed, tested, deployed and eventually retired are key in preventing the rise shadow AI.

> "Shadow AI is the unsanctioned use of any artificial intelligence (AI) tool or application by employees or end users without the formal approval or oversight of the information technology (IT) department." - [IBM](https://www.ibm.com/think/topics/shadow-ai)

**Policies and Standards** - Policies and standards extend governance into day to day practice. They formalize expectations around how AI is developed, deployed, and used, translating high-level principles into enforceable guidance.

**Security Integration** - Security and privacy are foundational in building sustainable and trustworthy AI systems. Embedding security considerations at the governance level ensures that controls are designed into the AI lifecycle, rather than added as an afterthought.

## Maintaining the 'Old' Ways

Now that we've got AI, the craze is on prompt injection, model and agent hijacking, data poisoning, jail breaking and other new attack vectors. While these attack vectors introduce new risks and new attack surfaces -- namely models and agents -- it is crucial to remember that AI systems are still computer systems. They are built on, run on, and communicate through the same infrastructure and attack surfaces we have been defending for decades. Essentially, what I am trying to say is AI systems are computer systems and should be secured as such. Additionally, AI systems often consist of non-AI components such as storage and compute resources, we must also not forget the myriad of non-AI systems used to build AI systems such as Machine Learning pipelines.

Securing AI involves assessing, monitoring and hardening the security posture of the underlying infrastructure that enables our AI systems. This includes but is not limited to networking infrastructure, APIs, compute used in training and inference...e.t.c. For example, there is no doubt that extending an existing security practices such as enforcing robust identity and access management will go a long way in securing AI systems.

Long standing security initiatives such as adversarial testing, user and developer education, continuous security monitoring, and security by design play a vital role in AI security. Traditional concepts such as defense in depth remain highly applicable and should not be abandoned in favor of purely "AI native" controls.

But what about the new stuff?

## Building Competency

Beyond governance and infrastructure, competency is a critical pillar of AI security. In this context, competency can be understood as the ability to consistently:

-   Anticipate AI-specific threats
-   Detect and respond to potential AI abuse/security incidents
-   Adapt AI systems in response to emerging threats
-   Adapt AI systems to evolving regulatory requirements
-   Make informed, risk-based decisions

It is difficult, if not impossible, to secure a system that one does not understand. Without a solid grasp of how AI systems function, security teams cannot fully comprehend their threat landscape or evaluate appropriate mitigation strategies. Building competency empowers security professionals to engage meaningfully with new AI attack surfaces, risks, and regulations.

Competency extends beyond technical knowledge of AI models and architectures. It also encompasses an understanding of but also the organization's processes, policies and governance approach. In practice, building competency is supported by:

-   Continuous education and skills development
-   Strong cross-functional collaboration between security, engineering, legal, and business teams
-   Continuous assurance activities, such as red-teaming and adversarial testing

* * *

## Conclusion

Securing AI systems ultimately rests on three foundational pillars: effective governance, robust security of the underlying systems, and sustained competency building. Without these pillars, organizations risk being overwhelmed by hype, impractical guidance, and so-called silver-bullet solutions that fail to deliver meaningful security outcomes.

I am curious to hear your perspectives on this topic. Join the conversation on [LinkedIn](https://www.linkedin.com/posts/davidngeiomurwa_most-organizations-are-approachingai-security-share-7418333386462822400-dDcS?utm_source=share&utm_medium=member_desktop&rcm=ACoAADYoySkBhd649KpdONPRlL4CJD5xPS3dKlw).

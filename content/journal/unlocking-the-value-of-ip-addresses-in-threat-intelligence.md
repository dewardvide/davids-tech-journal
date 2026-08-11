---
title: "Unlocking The Value of IP Addresses in Threat Intelligence"
date: "2025-03-05"
summary: "TL;DR - IP addresses are often seen as low-value IOCs. This article aims to explore how choosing the correct sources based on their intended usage and enrichment can help us make the most out of IP addresses."
topics: ["THREAT INTEL", "DFIR"]
readTime: "8 min read"
---
## Introduction

An Indicator of Compromise (IOCs) can be defined as a digital piece of evidence that indicates a potential cyber security breach. Internet Protocol (IP) addresses are fundamentally used to identify the source and destination of network traffic, therefore, they are a staple IOC as they may be used to identify connections to and from malicious entities. Nonetheless, IP addresses appear close to the bottom of [David Bianco's Pyramid of Pain](http://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html). The Pyramid of Pain is an illustration that shows the relationship between IOCs and the effort required by an attacker to carry out an attack when the indicators are blocked. The pyramid of pain can also be useful in evaluating the accuracy and severity of a security alert based on the type of indicators found. Threat attribution [confidence](https://apps.dtic.mil/sti/pdfs/ADA586960.pdf) may also be based on the type of indicators found and where they lie in the Pyramid of Pain.

In his article, David Bianco explains the rationale behind the placement of IP addresses as follows:

> "Any reasonably advanced adversary can change IP addresses whenever it suits them, with very little effort. In some cases, if they are using an anonymous proxy service like Tor or something similar, they may change IPs quite frequently and never even notice or care. That's why IP Addresses are green in the pyramid. If you deny the adversary the use of one of their IPs, they can usually recover without even breaking stride."

![David Bianco's Pyramid of Pain showing IP addresses at the bottom as the easiest indicator for attackers to change.](/images/blog/unlocking-the-value-of-ip-addresses-in-threat-intelligence/pyramid-of-pain.png)

Taking the pyramid of pain into consideration, it can be difficult to obtain actionable intelligence from IP addresses without considering other factors. _This article aims to explore how choosing the correct sources based on their intended usage and enrichment can help us make the most out of IP addresses._

## Picking the Right IP Source for Tactical Use Cases

Below is a generalized list of sources we shall take into consideration:

-   **Verified Security Alerts** - these are security alerts that have been investigated and a verdict (True Positive/False Positive) has been given.
-   **Threat Intelligence Reports** - these includes reports and articles published by security vendors or independent researchers on security threats which often contain IOCs.
-   **Threat Intelligence sharing groups** - in this article IOC sharing groups refer to communities that comprise of organisations, usually in a particular industry where they share information about indicators of compromise.
-   **Threat Intelligence Services** - these are services that collect IOCs from various sources such as malware samples and OSINT, and provide them to their clients for free or at a price. Examples include: Recorded Future, Microsoft Threat Intelligence...e.t.c.

### Identifying IPs to Use in Threat Detection and Prevention

Threat detection in the context of this article entails the sole use of IP addresses to detect security threats within a given environment/network. An example of such a detection rule would look like this:

```
DeviceNetworkEvents
| where RemoteIP = <malicious IP> or where LocalIP = <malicious IP>
```

The rule above detects the communication between monitored device and a specified malicious IP address where the IP address is either the source (LocalIP) or destination (RemoteIP) of the network traffic.

Threat prevention is the prevention refers to neutralizing threats before the cause harm. In the context of IP addresses, threat prevention may be represented as a firewall/IPS rule similar to the one illustrated in the example below whereby a network connection from a source IP is blocked.

```
Rule Type: Block Malicious Traffic
Protocol: TCP
Ports: 80, 443
Source IP: <malicious IP>
Destination IP: <internal network>
Action: Deny
Log Level: High
```

Setting up such security controls should be done with caution and a high level of precision. Consider this, having low fidelity IPs may lead to a huge amount of undesired security alerts or even, blocking users from accessing important, internet hosted resources.

Threat detection and prevention in the style illustrated above should only be done with IPs obtained from high confidence sources. Additionally, security teams should make an effort to establish an IOC decay algorithm that ensures that the rules are time bound and not permanent. That said let's classify our IP sources above:

**High Confidence Sources**

These are IPs you should definitely add into your threat detection and prevention dataset.

Verified Security Alerts: In this case you are the most recent target of the attack. You also know, with high confidence, that the IP is malicious at the moment you obtained it. The tendency of attackers to conduct large scale targeted attacks makes this a ripe indicator for the detection of recent attacks targeting devices across your environment.

**Medium Confidence Sources**

Ideally, I would like to have these IPs in a datastore (Threat Intelligence Platform) that is used to enrich security alerts - so when a security alert is triggered, I can cross check the IPs in the alert against these ones for more context.

Threat Intelligence Services: The source of the IP may not be included by the threat intelligence services. Additionally, the chances of the same IP being used across multiple targets is low thus lowering the chances of accurate detections. Nonetheless IPs from these sources may contain IPs hardcoded into malware, such IPs are useful to have for both threat detection and prevention.

IOC Sharing Groups: The idea behind threat intelligence sharing groups is awesome, however, due to the various legal and regulatory hurdles that organizations have to go through before sharing indicators. IOCs often arrive as stale and no longer in use by attackers. Despite that, the IPs provided are obtained from industry specific attacks which makes them work considering.

**Low Confidence Sources**

These IPs should not be used in threat detection and prevention.

Threat Intelligence Reports: These reports are usually released weeks or even months after threat activity is observed. Often times, threat intelligence attributes such as IP addresses are usually reported and the malicious entities are remediated (taken down), or, the respective threat actor would have stopped using these IPs.

### Identifying IPs to Use in Threat Hunting

Threat hunting can be described as the proactive search of attackers in a given environment, usually through querying live and historical log sources for indicators of compromise.

Threat Intelligence Reports can be indispensable when it comes to querying historical data. Searching for IPs given in a reputable intelligence report in historical log sources from a timeframe that aligns with the timeframe of threat activity provided in the report is set to give you high confidence verdict for you threat hunt hypothesis. The same applies to IOC sharing groups since you can query the IPs against logs from the timeframe which the attack happened. IPs from verified security alerts can also provide high fidelity results especially where the scope of the threat hunt is limited to recent activity before and after the security alert.

For threat intelligence services, it would depend on the context which the IP is provided. This is to say, we should at least know when, and for what these IPs were being used. However, in cases where no context is given, it would be better to disregard such IPs.

## Enriching IPs to Enhance Clarity

IPs can tell us a lot about the network node they are assigned to. Below are fundamental attributes we can extract from IP addresses that can help us understand the nature of the IP address it self no matter the scenario.

-   **Geolocation**: Information such as IP country can give us an insight as to where the host is communicating from. This can help you identify threats whose activity is limited to specific locations as well as to determine anomalies in sign-in data.
-   **IP ASNs**: ASN, short for Autonomous System Numbers are unique identifiers of autonomous systems (ASs) - think of these as large interconnected segments of the internet. This might be useful in identifying threat actors that operate in a certain AS. ASNs may also be used to determine IP ownership.
-   **Associated Domain Names and Hostnames**: these can be obtained via a reverse domain lookup and/or a whois search.

Virus Total is a treasure trove when it comes to IP enrichment. It not only provides the information above but also includes related entities, communicating files, security vendor analysis and community opinions.

![VirusTotal IP enrichment view showing security vendor analysis and related entities.](/images/blog/unlocking-the-value-of-ip-addresses-in-threat-intelligence/virustotal-1.png)

![VirusTotal detailed IP enrichment data including communicating files and community opinions.](/images/blog/unlocking-the-value-of-ip-addresses-in-threat-intelligence/virustotal-2.png)

## Conclusion

To conclude, while IP addresses may be considered low value IOCs, they are not entirely useless. As much as I must emphasize the importance of prioritizing detecting TTPs not IOCs. IPs are not entirely useless pieces of threat intelligence and it is possible to extract value from them through analyzing the sources and enriching them.

References:

-   [The Pyramid of Pain](http://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html) by David Bianco
-   [The Diamond Model of Intrusion Analysis](https://apps.dtic.mil/sti/pdfs/ADA586960.pdf)

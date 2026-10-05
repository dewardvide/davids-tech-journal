import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/ds/core/Callout.jsx';
import { Meta } from '@/components/ds/core/Meta.jsx';
import { PageHead } from '@/components/PageHead';
import { LINKS } from '@/lib/links';

const CAPABILITIES = [
  {
    label: 'Security engineering',
    title: 'Detection, triage, and threat-informed decisions',
    body: 'I develop and test detection logic, investigate how it behaves against real traffic, triage vulnerabilities, and turn threat intelligence into decisions analysts can act on.',
  },
  {
    label: 'Applied AI',
    title: 'AI systems evaluated against real security work',
    body: 'I test models on representative datasets, measure precision and failure modes, and design AI-assisted workflows that improve analysis without hiding uncertainty from the operator.',
  },
  {
    label: 'Automation',
    title: 'Repeatable tooling and infrastructure',
    body: 'I build with Python, TypeScript, Terraform, Azure, and Microsoft Sentinel — from analyst workflows and data tools to reproducible cloud deployments and local LLM infrastructure.',
  },
  {
    label: 'Communication',
    title: 'Technical work made useful to other people',
    body: 'I turn experiments, implementation details, and lessons learned into clear research, notebooks, and video walkthroughs that practitioners can challenge and reuse.',
  },
];

const PROOF = [
  {
    label: 'Product',
    title: 'Wrangler',
    href: LINKS.wrangler,
    body: 'An AI-powered workspace for analysing CSV and Excel data, generating visualisations, and keeping uploaded data private.',
  },
  {
    label: 'LLM operations',
    title: 'vllm-ctl',
    href: LINKS.vllmCtl,
    body: 'A local control plane for vLLM with model discovery, VRAM fit checks, launch configuration, GPU telemetry, and live benchmarking.',
  },
  {
    label: 'Cloud security',
    title: 'Simple Sentinel',
    href: LINKS.simpleSentinel,
    body: 'A Terraform template for provisioning a complete Azure Sentinel SIEM workspace as repeatable infrastructure.',
  },
  {
    label: 'Technical education',
    title: 'CleonSec',
    href: LINKS.cleonsec,
    body: 'Cybersecurity walkthroughs, research breakdowns, and practical tool demonstrations on YouTube.',
  },
];

/** Held certifications, newest first. Each is verifiable by its credential ID. */
const CERTIFICATIONS = [
  {
    name: 'Microsoft Certified: Cloud and AI Security Engineer Associate',
    credentialId: '23A279C8338E3CA',
  },
  { name: 'ADG Verified in Defend', credentialId: 'ADG-DEF-XWH0FF' },
  {
    name: 'Certificate of completion: Introduction to agent skills',
    credentialId: 'tdvskp87megq',
  },
  { name: 'Microsoft Certified: Azure AI Fundamentals', credentialId: 'D8288B5AA36FA8CA' },
  {
    name: 'Microsoft Certified: Security Operations Analyst Associate',
    credentialId: 'BE84E4B19B63CE8B',
  },
  { name: 'Junior Penetration Tester (eJPT)', credentialId: '92568821' },
];

const description =
  'Meet David Omurwa, a cybersecurity engineer building detection engineering, security automation, Microsoft Sentinel, and applied AI systems.';

export const metadata: Metadata = {
  title: 'About David Omurwa',
  description,
  openGraph: {
    title: 'David Omurwa — cybersecurity engineer and applied AI builder',
    description,
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        kicker="About"
        title="David Omurwa"
        lede="Cybersecurity engineer building practical AI and automation for security teams — from detection engineering and vulnerability triage to local LLM infrastructure and repeatable cloud deployments."
      />

      <div className="dtj-prose" style={{ marginTop: '3.2em' }}>
        <p>
          I help turn noisy, manual security work into systems that are easier to trust, operate, and
          scale. My work sits across security operations, detection logic, vulnerability analysis,
          threat intelligence, and the engineering around them.
        </p>
        <p>
          I&rsquo;m based in Wroc&#322;aw, Poland. What connects my projects is a practical standard:
          start with a real operational problem, test the solution against evidence, and keep the
          human operator in control.
        </p>
      </div>

      <section className="dtj-section">
        <h2>What I bring</h2>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: 'var(--size-sm)',
            margin: '1.4em 0 0',
            maxWidth: 'var(--measure-body)',
          }}
        >
          A security-first combination of operational depth, software delivery, and clear technical
          communication.
        </p>
        <div style={{ borderTop: '1px solid var(--border-hairline)', marginTop: '1.4em' }}>
          {CAPABILITIES.map((capability) => (
            <article
              key={capability.label}
              className="dtj-rail"
              style={{ padding: '26px 0', borderBottom: '1px solid var(--border-hairline)' }}
            >
              <div className="dtj-rail-head" style={{ paddingTop: '4px' }}>
                <Meta>{capability.label}</Meta>
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{capability.title}</h3>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 'var(--size-sm)',
                    margin: '.6em 0 0',
                    maxWidth: 'var(--measure-body)',
                  }}
                >
                  {capability.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dtj-section">
        <h2>Proof in the work</h2>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: 'var(--size-sm)',
            margin: '1.4em 0 0',
            maxWidth: 'var(--measure-body)',
          }}
        >
          I prefer working software, reproducible infrastructure, and published analysis over a list
          of technologies without context.
        </p>
        <div style={{ borderTop: '1px solid var(--border-hairline)', marginTop: '1.4em' }}>
          {PROOF.map((item) => (
            <article
              key={item.title}
              className="dtj-rail"
              style={{ padding: '26px 0', borderBottom: '1px solid var(--border-hairline)' }}
            >
              <div className="dtj-rail-head" style={{ paddingTop: '4px' }}>
                <Meta>{item.label}</Meta>
              </div>
              <div>
                <h3 style={{ margin: 0 }}>
                  <a href={item.href} style={{ color: 'inherit', borderBottom: 'none' }}>
                    {item.title}
                  </a>
                </h3>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 'var(--size-sm)',
                    margin: '.6em 0 0',
                    maxWidth: 'var(--measure-body)',
                  }}
                >
                  {item.body}
                </p>
                <a href={item.href} className="dtj-arrow" style={{ marginTop: '10px' }}>
                  View the work &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
        <Link href="/journal" className="dtj-arrow" style={{ marginTop: '1.4em' }}>
          Read the research and field notes &rarr;
        </Link>
      </section>

      <section className="dtj-section">
        <h2>How I work</h2>
        <div className="dtj-prose" style={{ marginTop: '1.4em' }}>
          <p>
            Most entries in this journal begin with something I actually had to do: evaluate a model
            against a real dataset, understand why a clean rule failed in production traffic, or
            automate a workflow whose manual version had stopped scaling.
          </p>
          <p>
            I publish the method, the result, and the parts that did not work. That habit is central
            to how I engineer: make assumptions visible, measure what matters, and leave behind
            something another practitioner can inspect and improve.
          </p>
        </div>
      </section>

      <section className="dtj-section">
        <h2>Certifications</h2>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: 'var(--size-sm)',
            margin: '1.4em 0 0',
            maxWidth: 'var(--measure-body)',
          }}
        >
          Formal validation across cloud and AI security, security operations, defensive practice,
          and penetration testing.
        </p>
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1.4em' }}>
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.credentialId} style={{ marginTop: '.9em' }}>
              {cert.name}
              <Meta style={{ display: 'block', marginTop: '.2em' }}>
                Credential ID {cert.credentialId}
              </Meta>
            </li>
          ))}
        </ul>
      </section>

      <section className="dtj-section">
        <h2>Let&rsquo;s connect</h2>
        <Callout style={{ marginTop: '1.4em' }}>
          Building a security, applied-AI, or automation project where operational reality matters?
          I&rsquo;m open to conversations about engineering work, collaboration, technical research,
          and knowledge sharing. Start with <a href={LINKS.linkedin}>LinkedIn</a>, review my{' '}
          <a href={LINKS.github}>GitHub</a>, or watch <a href={LINKS.cleonsec}>CleonSec</a>.
        </Callout>
      </section>
    </>
  );
}

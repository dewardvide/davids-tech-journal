import type { Metadata } from 'next';
import { Callout } from '@/components/ds/core/Callout.jsx';
import { Meta } from '@/components/ds/core/Meta.jsx';
import { PageHead } from '@/components/PageHead';
import { LINKS } from '@/lib/links';

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

export const metadata: Metadata = {
  title: 'About',
  description: 'David Omurwa — cybersecurity engineer, AI builder, and tool maker, based in Wrocław, Poland.',
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        kicker="About"
        title="David Omurwa"
        lede="Cybersecurity engineer, AI builder, and tool maker working at the intersection of security, automation, and applied AI."
      />

      <div className="dtj-prose" style={{ marginTop: '3.2em' }}>
        <p>
          I&rsquo;m based in Wroc&#322;aw, Poland. My day-to-day sits between security operations and the
          machinery around it — detection logic, vulnerability triage, threat intelligence, and the
          automation that keeps any of it sustainable at volume.
        </p>
        <p>
          This journal is where that work gets written down. Most entries start as something I actually
          had to do: a model I tested against a real dataset, a rule that looked clean until it met
          production traffic, a workflow I built because the manual version had stopped scaling. I
          publish the results including the parts that did not work, because those are usually the
          useful parts.
        </p>
        <p>
          Alongside the writing I build tools — <a href={LINKS.wrangler}>Wrangler</a> for data analysis,{' '}
          <a href={LINKS.simpleSentinel}>Simple Sentinel</a> for standing up an Azure Sentinel stack — and
          publish cybersecurity walkthroughs on <a href={LINKS.cleonsec}>CleonSec</a>.
        </p>

        <Callout style={{ marginTop: '1.8em' }}>
          Nothing here is pitched as a complete solution. If you find something wrong, say so — the
          fastest way to reach me is <a href={LINKS.linkedin}>LinkedIn</a>.
        </Callout>

        <h2>Certifications</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.credentialId} style={{ marginTop: '.9em' }}>
              {cert.name}
              <Meta style={{ display: 'block', marginTop: '.2em' }}>
                Credential ID {cert.credentialId}
              </Meta>
            </li>
          ))}
        </ul>

        <h2>Elsewhere</h2>
        <ul>
          <li>
            <a href={LINKS.github}>GitHub</a> — tools, templates, and the notebooks behind several entries
          </li>
          <li>
            <a href={LINKS.linkedin}>LinkedIn</a> — where most conversations about these entries happen
          </li>
          <li>
            <a href={LINKS.cleonsec}>CleonSec on YouTube</a> — walkthroughs, research breakdowns, tool demos
          </li>
        </ul>
      </div>
    </>
  );
}

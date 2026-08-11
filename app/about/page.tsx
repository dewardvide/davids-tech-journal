import type { Metadata } from 'next';
import { Callout } from '@/components/ds/core/Callout.jsx';
import { PageHead } from '@/components/PageHead';
import { LINKS } from '@/lib/links';

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

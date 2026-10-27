import { Archive, Pencil, Plus, ShieldAlert, Trash2, Wrench, type LucideIcon } from 'lucide-react'
import { Markdown } from '@/components/markdown'

/** Keep a Changelog sections: label -> tone (colour) and icon. Anything else is rendered as plain markdown. */
const SECTIONS: Record<string, { tone: string; icon: LucideIcon }> = {
  added: { tone: 'added', icon: Plus },
  changed: { tone: 'changed', icon: Pencil },
  fixed: { tone: 'fixed', icon: Wrench },
  removed: { tone: 'removed', icon: Trash2 },
  security: { tone: 'security', icon: ShieldAlert },
  deprecated: { tone: 'deprecated', icon: Archive },
}

type Block = { heading?: string; text: string }

/** Splits an entry body into the part before the first "### Section" and the sections (headings inside code fences are ignored). */
function split(body: string): Block[] {
  const blocks: Block[] = [{ text: '' }]
  let fence = false
  const raw: string[][] = [[]]
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence
    const m = !fence && line.match(/^###[ \t]+(.+?)[ \t]*$/)
    if (m) {
      blocks.push({ heading: m[1], text: '' })
      raw.push([])
    } else raw[raw.length - 1].push(line)
  }
  return blocks.map((b, i) => ({ ...b, text: raw[i].join('\n').trim() })).filter((b) => b.heading || b.text)
}

export function ChangelogBody({ children }: { children: string }) {
  return (
    <div className="space-y-5">
      {split(children).map((b, i) => {
        const s = b.heading ? SECTIONS[b.heading.toLowerCase()] : undefined
        if (!s) return <Markdown key={i}>{b.heading ? `### ${b.heading}\n\n${b.text}` : b.text}</Markdown>
        const Icon = s.icon
        return (
          <section key={i} className={`cl-section cl-${s.tone}`}>
            <h4 className="cl-badge">
              <Icon className="size-3.5" aria-hidden /> {b.heading}
            </h4>
            {b.text && <Markdown>{b.text}</Markdown>}
          </section>
        )
      })}
    </div>
  )
}

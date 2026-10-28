export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-[11px] text-secondary-foreground">
          {tag}
        </span>
      ))}
    </div>
  )
}

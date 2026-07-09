import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-accent-foreground">
        <Icon size={28} />
      </span>
      <h3 className="mt-6 font-serif text-2xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

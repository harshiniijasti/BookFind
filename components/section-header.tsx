import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = 'View all',
}: {
  title: string
  subtitle?: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-serif text-2xl text-balance sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          {linkLabel}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}

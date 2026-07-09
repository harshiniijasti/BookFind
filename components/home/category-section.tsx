import Link from 'next/link'
import { categories } from '@/lib/data'
import { SectionHeader } from '@/components/section-header'

export function CategorySection() {
  return (
    <section>
      <SectionHeader
        title="Browse by Category"
        subtitle="Find your next read across every genre."
        href="/explore"
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/explore?genre=${encodeURIComponent(category.name)}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: category.tint }}
          >
            <span className="font-serif text-lg text-foreground">{category.name}</span>
            <span className="mt-8 text-sm font-medium text-foreground/70">
              {category.count} books
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

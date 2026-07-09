import Link from 'next/link'
import { BookOpen } from 'lucide-react'

const columns = [
  {
    title: 'Discover',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Explore', href: '/explore' },
      { label: 'Trending', href: '/explore' },
      { label: 'New Releases', href: '/explore' },
    ],
  },
  {
    title: 'Library',
    links: [
      { label: 'Favorites', href: '/favorites' },
      { label: 'Reading List', href: '/reading-list' },
      { label: 'Profile', href: '/profile' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/about' },
      { label: 'Contact', href: '/about' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2" aria-label="BookFind home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <BookOpen size={18} />
              </span>
              <span className="font-serif text-xl font-medium tracking-tight">BookFind</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A calmer way to discover, save, and organize the books worth your time.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} BookFind. All rights reserved.</p>
          <p>Crafted for readers, by readers.</p>
        </div>
      </div>
    </footer>
  )
}

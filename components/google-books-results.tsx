'use client'

import Link from 'next/link'
import type { Book } from '@/lib/data'

export function GoogleBooksResults({
  books,
}: {
  books: Book[]
}) {
  if (books.length === 0) return null

  return (
    <section className="mt-14">
      <h2 className="font-serif text-3xl">
        Google Books Results
      </h2>

      <p className="mt-2 text-muted-foreground">
        Live search results from Google Books.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <div className="aspect-[2/3] bg-secondary">
              <img
                src={book.cover}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="line-clamp-2 font-serif text-lg">
                {book.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {book.author}
              </p>

              <p className="mt-2 text-sm">
                ⭐ {book.rating || 'N/A'}
              </p>

              <p className="text-sm text-muted-foreground">
                {book.year || 'Unknown'}
              </p>

              <Link
                href={`/book/${book.id}?source=google`}
                className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
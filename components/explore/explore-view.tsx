'use client'

import { useEffect, useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { books, genres } from '@/lib/data'
import { searchGoogleBooks } from '@/lib/google-books'
import { BookGrid } from '@/components/book-grid'
import { GoogleBooksResults } from '@/components/google-books-results'
import { SearchBar } from '@/components/search-bar'
import { cn } from '@/lib/utils'

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'title', label: 'Title (A–Z)' },
] as const

type SortValue = (typeof sortOptions)[number]['value']

export function ExploreView({
  initialQuery = '',
  initialGenre = 'All',
}: {
  initialQuery?: string
  initialGenre?: string
}) {
  const [query, setQuery] = useState(initialQuery)

  const [genre, setGenre] = useState(
    genres.includes(initialGenre as never) ? initialGenre : 'All',
  )

  const [sort, setSort] = useState<SortValue>('popular')

  const [googleBooks, setGoogleBooks] = useState<any[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
  const searchText =
    query.trim() || (genre !== 'All' ? genre : '')

  if (!searchText) {
    setGoogleBooks([])
    return
  }

  try {
    const results = await searchGoogleBooks(searchText)
    setGoogleBooks(results)
  } catch (err) {
    console.error(err)
  }
}

    const timer = setTimeout(fetchBooks, 400)

    return () => clearTimeout(timer)
  }, [query, genre])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    let result = books.filter((book) => {
      const matchesGenre = genre === 'All' || book.genre === genre

      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.genre.toLowerCase().includes(q)

      return matchesGenre && matchesQuery
    })

    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'rating':
          return b.rating - a.rating

        case 'newest':
          return b.year - a.year

        case 'title':
          return a.title.localeCompare(b.title)

        default:
          return 0
      }
    })

    return result
  }, [query, genre, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl">
          Explore Books
        </h1>

        <p className="mt-2 max-w-xl text-muted-foreground">
          Search the full catalog and discover books.
        </p>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="lg:max-w-md lg:flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={16}
            className="text-muted-foreground"
          />

          <label
            htmlFor="sort"
            className="text-sm text-muted-foreground"
          >
            Sort by
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as SortValue)
            }
            className="rounded-full border border-border bg-card px-4 py-2 text-sm"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm',

              genre === g
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:border-accent',
            )}
          >
            {g}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'book' : 'books'} found
      </p>

      <div className="mt-6">
        {filtered.length ? (
          <BookGrid books={filtered} />
        ) : (
          <div className="rounded-xl border border-dashed border-border p-6 text-center">
  <p className="font-medium">
    SCROLL DOWN 
  </p>

  <p className="mt-2 text-sm text-muted-foreground">
    Showing live results from Google Books below.
  </p>
</div>
        )}

        <GoogleBooksResults books={googleBooks} />
      </div>
    </div>
  )
}
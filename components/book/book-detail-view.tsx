'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  BookmarkPlus,
  Check,
  FileText,
  Globe,
  Heart,
  CalendarDays,
} from 'lucide-react'
import type { Book } from '@/lib/data'
import { useLibrary } from '@/components/library-provider'
import { RatingStars } from '@/components/rating-stars'
import { BookGrid } from '@/components/book-grid'
import { SectionHeader } from '@/components/section-header'
import { cn } from '@/lib/utils'

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Globe
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
        <Icon size={17} />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="truncate text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  )
}

export function BookDetailView({
  book,
  similar,
}: {
  book: Book
  similar: Book[]
}) {
  const {
    isFavorite,
    toggleFavorite,
    getEntry,
    setStatus,
    setProgress,
    removeFromList,
    addRecentlyViewed,
  } = useLibrary()

  const favorite = isFavorite(book.id)
  const entry = getEntry(book.id)
  const inList = Boolean(entry)
  const progress = entry?.progress ?? 0

  useEffect(() => {
    addRecentlyViewed(book.id)
  }, [book.id, addRecentlyViewed])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/explore"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to Explore
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-border shadow-xl">
            <Image
              src={book.cover || '/placeholder.svg'}
              alt={`Cover of ${book.title} by ${book.author}`}
              fill
              sizes="320px"
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-foreground">
            {book.genre}
          </span>

          <h1 className="mt-4 font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
            {book.title}
          </h1>

          <p className="mt-3 text-lg text-muted-foreground">
            by{' '}
            <span className="font-medium text-foreground">
              {book.author}
            </span>
          </p>

          <div className="mt-4">
            <RatingStars
              rating={book.rating}
              size={18}
            />
          </div>

          <p className="mt-6 max-w-2xl leading-relaxed text-foreground/80 text-pretty">
            {book.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toggleFavorite(book)}
              aria-pressed={favorite}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all',
                favorite
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-primary text-primary-foreground hover:opacity-90',
              )}
            >
              <Heart
                size={17}
                fill={favorite ? 'currentColor' : 'none'}
              />

              {favorite
                ? 'In Favorites'
                : 'Add to Favorites'}
            </button>

            <button
              type="button"
              onClick={() => {
                if (inList) {
                  removeFromList(book.id)
                } else {
                  setStatus(book, 'want')
                }
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors',
                inList
                  ? 'border-border bg-secondary text-foreground'
                  : 'border-border bg-card text-foreground hover:border-accent',
              )}
            >
              {inList ? (
                <Check size={17} />
              ) : (
                <BookmarkPlus size={17} />
              )}

              {inList
                ? 'Remove from Reading List'
                : 'Add to Reading List'}
            </button>

            {inList && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    Reading Progress
                  </h3>

                  <span className="text-sm text-muted-foreground">
                    {progress}%
                  </span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) =>
                    setProgress(
                      book.id,
                      Number(e.target.value),
                    )
                  }
                  className="mt-3 w-full"
                />
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Meta
              icon={Globe}
              label="Language"
              value={book.language}
            />

            <Meta
              icon={FileText}
              label="Pages"
              value={`${book.pages}`}
            />

            <Meta
              icon={CalendarDays}
              label="Published"
              value={`${book.year}`}
            />
          </div>
        </div>
      </div>

      <section className="mt-20">
        <SectionHeader
          title="Similar Books"
          subtitle="You might also enjoy these titles."
        />

        <BookGrid books={similar} />
      </section>
    </div>
  )
}

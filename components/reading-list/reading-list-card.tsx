'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import type { Book } from '@/lib/data'
import type { ReadingEntry } from '@/components/library-provider'
import { useLibrary } from '@/components/library-provider'
import { RatingStars } from '@/components/rating-stars'

export function ReadingListCard({
  book,
  entry,
}: {
  book: Book
  entry: ReadingEntry
}) {
  const { setProgress, removeFromList } = useLibrary()

  const showProgress = entry.status !== 'want'

  const step = (delta: number) => {
    const next = Math.min(
      100,
      Math.max(0, entry.progress + delta)
    )

    setProgress(book.id, next)
  }

  return (
    <div className="group relative flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={
          book.source === 'google'
            ? `/book/${book.id}?source=google`
            : `/book/${book.id}`
        }
        className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg border border-border sm:w-24"
      >
        <Image
          src={book.cover || '/placeholder.svg'}
          alt={`Cover of ${book.title}`}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[11px] font-medium uppercase tracking-wider text-accent">
              {book.genre}
            </span>

            <Link
              href={
                book.source === 'google'
                  ? `/book/${book.id}?source=google`
                  : `/book/${book.id}`
              }
              className="block truncate font-serif text-lg leading-snug hover:underline"
            >
              {book.title}
            </Link>

            <p className="truncate text-sm text-muted-foreground">
              {book.author}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeFromList(book.id)}
            aria-label={`Remove ${book.title} from reading list`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-2">
          <RatingStars
            rating={book.rating}
            size={13}
          />
        </div>

        {showProgress ? (
          <div className="mt-auto pt-3">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">
                {entry.progress}% complete
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => step(-10)}
                  aria-label="Decrease progress"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Minus size={12} />
                </button>

                <button
                  type="button"
                  onClick={() => step(10)}
                  aria-label="Increase progress"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            <div
              className="h-2 w-full overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuenow={entry.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Reading progress for ${book.title}`}
            >
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${entry.progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="mt-auto pt-3">
            <button
              type="button"
              onClick={() => setProgress(book.id, 5)}
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start reading
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

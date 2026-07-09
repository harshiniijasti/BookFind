'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { Book } from '@/lib/data'
import { useLibrary } from '@/components/library-provider'
import { RatingStars } from '@/components/rating-stars'
import { cn } from '@/lib/utils'

export function BookCard({ book }: { book: Book }) {
  const { isFavorite, toggleFavorite } = useLibrary()
  const favorite = isFavorite(book.id)

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/book/${book.id}`}
        className="relative block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
      >
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={book.cover || '/placeholder.svg'}
            alt={`Cover of ${book.title} by ${book.author}`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavorite(book)}
        aria-label={favorite ? `Remove ${book.title} from favorites` : `Add ${book.title} to favorites`}
        aria-pressed={favorite}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm backdrop-blur transition-all hover:scale-110 hover:bg-background"
      >
        <Heart
          size={17}
          className={cn('transition-colors', favorite ? 'text-accent' : 'text-muted-foreground')}
          fill={favorite ? 'currentColor' : 'none'}
        />
      </button>

      <div className="mt-3 flex flex-col gap-1">
        <span className="text-[11px] font-medium uppercase tracking-wider text-accent">
          {book.genre}
        </span>
        <Link href={`/book/${book.id}`} className="font-serif text-base leading-snug text-pretty hover:underline">
          {book.title}
        </Link>
        <span className="text-sm text-muted-foreground">{book.author}</span>
        <RatingStars rating={book.rating} className="mt-1" />
      </div>
    </div>
  )
}

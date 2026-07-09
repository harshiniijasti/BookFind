'use client'

import { HeartCrack } from 'lucide-react'
import { useLibrary } from '@/components/library-provider'
import { BookGrid } from '@/components/book-grid'
import { EmptyState } from '@/components/empty-state'

export function FavoritesView() {
  const { favorites } = useLibrary()
  const favoriteBooks = favorites

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-balance sm:text-4xl">Your Favorites</h1>
        <p className="mt-2 text-muted-foreground">
          {favoriteBooks.length > 0
            ? `${favoriteBooks.length} book${favoriteBooks.length === 1 ? '' : 's'} you love, all in one place.`
            : 'Books you love will be saved here.'}
        </p>
      </header>

      {favoriteBooks.length > 0 ? (
        <BookGrid books={favoriteBooks} />
      ) : (
        <EmptyState
          icon={HeartCrack}
          title="No favorites yet"
          description="Tap the heart on any book to save it here for quick access later."
          actionLabel="Explore books"
          actionHref="/explore"
        />
      )}
    </div>
  )
}

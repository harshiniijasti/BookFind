'use client'

import { BookMarked } from 'lucide-react'
import type { ReadingStatus } from '@/components/library-provider'
import { useLibrary } from '@/components/library-provider'
import { ReadingListCard } from '@/components/reading-list/reading-list-card'
import { EmptyState } from '@/components/empty-state'

const sections: {
  status: ReadingStatus
  title: string
  description: string
}[] = [
  {
    status: 'want',
    title: 'Want to Read',
    description: 'Titles queued up for later.',
  },
  {
    status: 'reading',
    title: 'Currently Reading',
    description: 'Books you are working through now.',
  },
  {
    status: 'completed',
    title: 'Completed',
    description: 'Stories you have finished.',
  },
]

export function ReadingListView() {
  const { readingList } = useLibrary()

  const total = readingList.length

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-balance sm:text-4xl">
          Reading List
        </h1>

        <p className="mt-2 text-muted-foreground">
          Track your progress across everything you want to read, are reading,
          and have finished.
        </p>
      </header>

      {total === 0 ? (
        <EmptyState
          icon={BookMarked}
          title="Your reading list is empty"
          description="Add books from any detail page to start tracking your reading journey."
          actionLabel="Explore books"
          actionHref="/explore"
        />
      ) : (
        <div className="flex flex-col gap-12">
          {sections.map((section) => {
            const entries = readingList.filter(
              (e) => e.status === section.status,
            )

            return (
              <section key={section.status}>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl">
                      {section.title}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>

                  <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-secondary px-3 text-sm font-medium">
                    {entries.length}
                  </span>
                </div>

                {entries.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {entries.map((entry) => (
                      <ReadingListCard
                        key={entry.book.id}
                        book={entry.book}
                        entry={entry}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-2xl border border-dashed border-border bg-card px-5 py-8 text-center text-sm text-muted-foreground">
                    Nothing here yet.
                  </p>
                )}
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

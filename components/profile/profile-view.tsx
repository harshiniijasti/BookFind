'use client'

import { useUser, SignOutButton } from '@clerk/nextjs'
import { BookOpen, Heart, ListChecks, LogOut, Target } from 'lucide-react'
import { books, getBookById, mockUser } from '@/lib/data'
import { useLibrary } from '@/components/library-provider'
import { BookGrid } from '@/components/book-grid'
import { SectionHeader } from '@/components/section-header'

export function ProfileView() {
  const {
  favorites,
  readingList,
  recentlyViewed,
} = useLibrary()

const { user, isSignedIn } = useUser()

const guestMode =
  typeof window !== 'undefined' &&
  localStorage.getItem('guestMode') === 'true'

const profile =
  !guestMode && isSignedIn
    ? {
        name:
          user?.fullName ||
          user?.firstName ||
          user?.primaryEmailAddress?.emailAddress?.split('@')[0] ||
          'User',
        email: user?.primaryEmailAddress?.emailAddress || '',
        avatar: user?.imageUrl || '',
        bio: 'Welcome to your BookFind library.',
        joined: 'Google Account',
      }
    : {
        name: mockUser.name,
        email: mockUser.handle,
        avatar: '',
        bio: mockUser.bio,
        joined: 'Guest Session',
      }
  const goalPct = Math.min(100, Math.round((mockUser.booksRead / mockUser.readingGoal) * 100))
  const recentBooks = recentlyViewed
    .map((id) => getBookById(id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b))

      const completedBooks = readingList.filter(
  (book) => book.status === 'completed',
).length

const currentlyReading = readingList.filter(
  (book) => book.status === 'reading',
).length

const wantToRead = readingList.filter(
  (book) => book.status === 'want',
).length

const readingBooks = readingList
  .map((entry) => books.find((b) => b.id === entry.book.id))
  .filter(Boolean)

const totalPages = readingBooks.reduce(
  (sum, book) => sum + (book?.pages || 0),
  0,
)

const averageRating =
  readingBooks.length > 0
    ? (
        readingBooks.reduce(
          (sum, book) => sum + (book?.rating || 0),
          0,
        ) / readingBooks.length
      ).toFixed(1)
    : '0'

const genreCount: Record<string, number> = {}

readingBooks.forEach((book) => {
  if (!book) return

  genreCount[book.genre] = (genreCount[book.genre] || 0) + 1
})

const favoriteGenre =
  Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
  'N/A'
  const stats = [
    { label: 'Books Read', value: mockUser.booksRead, icon: BookOpen },
    { label: 'Favorites', value: favorites.length, icon: Heart },
    { label: 'On Reading List', value: readingList.length, icon: ListChecks },
    ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="h-28 bg-primary sm:h-36" />
        <div className="px-6 pb-8 sm:px-8">
          <div className="-mt-14 flex flex-col items-start gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-card bg-secondary shadow-md sm:h-32 sm:w-32">
  {profile.avatar ? (
    <img
      src={profile.avatar}
      alt={profile.name}
      className="h-full w-full object-cover"
    />
  ) : (
    <span className="text-5xl font-bold text-foreground">
      {profile.name.charAt(0)}
    </span>
  )}
</div>
              <div className="pb-1">
                <h1 className="font-serif text-3xl">{profile.name}</h1>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
            </div>
          {!guestMode && isSignedIn && (
  <SignOutButton>
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
    >
      <LogOut size={16} />
      Log out
    </button>
  </SignOutButton>
)}
          </div>

          <p className="mt-6 max-w-xl leading-relaxed text-foreground/80 text-pretty">
            {profile.bio}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
  {profile.joined}
</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-2xl border border-border bg-background px-3 py-4 text-center"
                >
                  <Icon size={18} className="text-accent" />
                  <span className="mt-2 font-serif text-2xl">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-accent-foreground">
              <Target size={18} />
            </span>
            <div>
              <h2 className="font-serif text-xl">2026 Reading Goal</h2>
              <p className="text-sm text-muted-foreground">
                {mockUser.booksRead} of {mockUser.readingGoal} books
              </p>
            </div>
          </div>
          <span className="font-serif text-2xl">{goalPct}%</span>
        </div>
        <div
          className="mt-4 h-3 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={goalPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading goal progress"
        >
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${goalPct}%` }}
          />
        </div>
      </div>
<div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
  <h2 className="font-serif text-2xl mb-4">
    Reading Insights
  </h2>

  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">Completed</p>
      <h3 className="text-2xl font-bold">{completedBooks}</h3>
    </div>

    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">Reading</p>
      <h3 className="text-2xl font-bold">{currentlyReading}</h3>
    </div>

    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">Want To Read</p>
      <h3 className="text-2xl font-bold">{wantToRead}</h3>
    </div>

    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">Favorite Genre</p>
      <h3 className="text-xl font-bold">{favoriteGenre}</h3>
    </div>

    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">Total Pages</p>
      <h3 className="text-2xl font-bold">{totalPages}</h3>
    </div>

    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">Average Rating</p>
      <h3 className="text-2xl font-bold">⭐ {averageRating}</h3>
    </div>

  </div>
</div>
      <section className="mt-16">
        <SectionHeader
          title="Recently Viewed"
          subtitle="Pick up where you left off."
          href="/explore"
        />
        <BookGrid books={recentBooks} />
      </section>
    </div>
  )
}

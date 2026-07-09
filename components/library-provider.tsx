'use client'
import type { Book } from '@/lib/data'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type ReadingStatus = 'want' | 'reading' | 'completed'

export type ReadingEntry = {
  book: Book
  status: ReadingStatus
  progress: number
}

type LibraryContextValue = {
  favorites: Book[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (book: Book) => void
  readingList: ReadingEntry[]
  getEntry: (id: string) => ReadingEntry | undefined
  setStatus: (book: Book, status: ReadingStatus) => void
  removeFromList: (id: string) => void
  setProgress: (id: string, progress: number) => void
  recentlyViewed: string[]
  addRecentlyViewed: (id: string) => void
}

const LibraryContext = createContext<LibraryContextValue | null>(null)

const seededFavorites: Book[] = []

const seededReadingList: ReadingEntry[] = []

export function LibraryProvider({ children }: { children: React.ReactNode }) {
const [favorites, setFavorites] = useState<Book[]>(seededFavorites)
 const [readingList, setReadingList] = useState<ReadingEntry[]>(seededReadingList)
 const [recentlyViewed, setRecentlyViewed] = useState<string[]>([])
 useEffect(() => {
  const saved = localStorage.getItem('favorites')

  if (saved) {
    setFavorites(JSON.parse(saved))
  }
}, [])

useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])
  useEffect(() => {
  const savedReadingList = localStorage.getItem('readingList')
  if (savedReadingList) {
    setReadingList(JSON.parse(savedReadingList))
  }
}, [])

useEffect(() => {
  localStorage.setItem('readingList', JSON.stringify(readingList))
}, [readingList])

const isFavorite = useCallback(
  (id: string) =>
    favorites.some((b) => b.id === id),
  [favorites],
)

  const toggleFavorite = useCallback((book: Book) => {
  setFavorites((prev) => {
    const exists = prev.some((b) => b.id === book.id)

    if (exists) {
      return prev.filter((b) => b.id !== book.id)
    }

    return [...prev, book]
  })
}, [])

  const getEntry = useCallback(
  (id: string) => readingList.find((e) => e.book.id === id),
  [readingList],
)

 const setStatus = useCallback((book: Book, status: ReadingStatus) => {
  setReadingList((prev) => {
    const existing = prev.find((e) => e.book.id === book.id)

    const progress =
      status === 'completed'
        ? 100
        : status === 'want'
        ? 0
        : existing?.progress ?? 5

    if (existing) {
      return prev.map((e) =>
        e.book.id === book.id
          ? { ...e, status, progress }
          : e,
      )
    }

    return [...prev, { book, status, progress }]
  })
}, [])

  const removeFromList = useCallback((id: string) => {
    setReadingList((prev) => prev.filter((e) => e.book.id !== id))
  }, [])

  const setProgress = useCallback((id: string, progress: number) => {
    setReadingList((prev) =>
      prev.map((e) =>
        e.book.id === id
          ? {
              ...e,
              progress,
              status: progress >= 100 ? 'completed' : progress <= 0 ? 'want' : 'reading',
            }
          : e,
      ),
    )
  }, [])

  const addRecentlyViewed = useCallback((id: string) => {
    setRecentlyViewed((prev) => [id, ...prev.filter((r) => r !== id)].slice(0, 8))
  }, [])

  const value = useMemo(
  () => ({
    favorites,
    isFavorite,
    toggleFavorite,
    readingList,
    getEntry,
    setStatus,
    removeFromList,
    setProgress,
    recentlyViewed,
    addRecentlyViewed,
  }),
  [
    favorites,
    isFavorite,
    toggleFavorite,
    readingList,
    getEntry,
    setStatus,
    removeFromList,
    setProgress,
    recentlyViewed,
    addRecentlyViewed,
  ],
)

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within a LibraryProvider')
  return ctx
}

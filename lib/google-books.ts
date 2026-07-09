import type { Book } from '@/lib/data'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY

function mapGoogleBook(item: any): Book {
  const info = item.volumeInfo

  return {
    id: item.id,
    title: info.title || 'Unknown Title',
    author: info.authors?.join(', ') || 'Unknown Author',
    genre: info.categories?.[0] || 'Unknown',
    rating: info.averageRating || 0,
    cover: info.imageLinks?.thumbnail || '/placeholder.svg',
    description: info.description || 'No description available.',
    language: info.language || 'Unknown',
    pages: info.pageCount || 0,
    year: info.publishedDate
      ? Number(info.publishedDate.substring(0, 4))
      : 0,
    source: 'google',
  }
}

export async function searchGoogleBooks(
  query: string,
): Promise<Book[]> {
  if (!query.trim()) return []

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query,
    )}&maxResults=20&key=${API_KEY}`,
  )

  const data = await res.json()

  return (data.items || []).map(mapGoogleBook)
}

export async function getTrendingBooks(): Promise<Book[]> {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=bestseller&maxResults=8&key=${API_KEY}`,
  )

  const data = await res.json()

  return (data.items || []).map(mapGoogleBook)
}

export async function getNewReleaseBooks(): Promise<Book[]> {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=8&key=${API_KEY}`,
  )

  const data = await res.json()

  return (data.items || []).map(mapGoogleBook)
}
export async function getGoogleBookById(id: string): Promise<Book | null> {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
  )

  if (!res.ok) return null

  const item = await res.json()

  return mapGoogleBook(item)
}
import { notFound } from 'next/navigation'
import { getBookById, getSimilarBooks } from '@/lib/data'
import { getGoogleBookById } from '@/lib/google-books'
import { BookDetailView } from '@/components/book/book-detail-view'

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ source?: string }>
}) {
  const { id } = await params
  const { source } = await searchParams

  if (source === 'google') {
  const book = await getGoogleBookById(id)

  if (!book) notFound()

  return (
    <BookDetailView
      book={book}
      similar={[]}
    />
  )
}

  const book = getBookById(id)

  if (!book) notFound()

  const similar = getSimilarBooks(book)

  return (
    <BookDetailView
      book={book}
      similar={similar}
    />
  )
}
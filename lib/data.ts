export type Book = {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  cover: string
  description: string
  language: string
  pages: number
  year: number
  source?: 'local' | 'google'
}

export const genres = [
  'All',
  'Literary Fiction',
  'Science Fiction',
  'Mystery',
  'Fantasy',
  'Self-Help',
  'Romance',
  'Adventure',
  'Nonfiction',
  'Historical',
  'Business',
  'Thriller',
] as const

export const books: Book[] = [
  {
    id: 'midnight-atlas',
    title: 'The Midnight Atlas',
    author: 'Elena Marsh',
    genre: 'Literary Fiction',
    rating: 4.7,
    cover: '/covers/midnight-atlas.png',
    description:
      'A luminous, genre-bending novel about a cartographer who discovers a map that charts not places, but the lives she could have lived. As each route reveals a new possibility, she must decide whether the life she has is the one she truly wants.',
    language: 'English',
    pages: 384,
    year: 2023,
  },
  {
    id: 'echoes-of-tomorrow',
    title: 'Echoes of Tomorrow',
    author: 'Jonas Reeve',
    genre: 'Science Fiction',
    rating: 4.5,
    cover: '/covers/echoes-of-tomorrow.png',
    description:
      'On a research station orbiting a dying star, a physicist begins receiving messages from a future that has not happened yet. A propulsive meditation on memory, fate, and the price of knowing what comes next.',
    language: 'English',
    pages: 421,
    year: 2024,
  },
  {
    id: 'the-silent-garden',
    title: 'The Silent Garden',
    author: 'Priya Anand',
    genre: 'Mystery',
    rating: 4.6,
    cover: '/covers/the-silent-garden.png',
    description:
      'When a renowned botanist vanishes from her estate, the only clue is the garden she left behind — each flower a coded message. A slow-burning literary mystery about secrets that refuse to stay buried.',
    language: 'English',
    pages: 352,
    year: 2022,
  },
  {
    id: 'crimson-throne',
    title: 'The Crimson Throne',
    author: 'Marcus Vale',
    genre: 'Fantasy',
    rating: 4.8,
    cover: '/covers/crimson-throne.png',
    description:
      'In a realm where crowns are forged from the bones of fallen kings, a stable girl discovers she carries the blood of a dynasty thought extinct. The first book in a sweeping epic of loyalty, magic, and rebellion.',
    language: 'English',
    pages: 596,
    year: 2023,
  },
  {
    id: 'quiet-minds',
    title: 'Quiet Minds',
    author: 'Dr. Naomi Cole',
    genre: 'Self-Help',
    rating: 4.4,
    cover: '/covers/quiet-minds.png',
    description:
      'A compassionate, science-backed guide to quieting anxious thinking and cultivating a calmer inner life. Practical tools for anyone seeking clarity in a noisy world.',
    language: 'English',
    pages: 268,
    year: 2024,
  },
  {
    id: 'ocean-of-stars',
    title: 'An Ocean of Stars',
    author: 'Isabella Fournier',
    genre: 'Romance',
    rating: 4.3,
    cover: '/covers/ocean-of-stars.png',
    description:
      'Two strangers meet on the last night of summer and make a promise to return to the same shore in ten years. A tender, sweeping love story about timing, distance, and the courage to begin again.',
    language: 'English',
    pages: 336,
    year: 2021,
  },
  {
    id: 'last-cartographer',
    title: 'The Last Cartographer',
    author: 'Theo Barnes',
    genre: 'Adventure',
    rating: 4.5,
    cover: '/covers/last-cartographer.png',
    description:
      'An aging mapmaker sets out on one final expedition to chart a coastline no one believes exists. A rousing adventure about obsession, legacy, and the edges of the known world.',
    language: 'English',
    pages: 402,
    year: 2020,
  },
  {
    id: 'numbers-dont-lie',
    title: "Numbers Don't Lie",
    author: 'Samuel Kwon',
    genre: 'Nonfiction',
    rating: 4.2,
    cover: '/covers/numbers-dont-lie.png',
    description:
      'A surprising and witty tour through the data that shapes our world, revealing the hidden patterns behind everyday life. Essential reading for the curious mind.',
    language: 'English',
    pages: 312,
    year: 2023,
  },
  {
    id: 'whispers-in-vienna',
    title: 'Whispers in Vienna',
    author: 'Clara Whitfield',
    genre: 'Historical',
    rating: 4.6,
    cover: '/covers/whispers-in-vienna.png',
    description:
      'Set against the glittering, uneasy backdrop of pre-war Vienna, a young violinist becomes entangled in a web of espionage and forbidden love. A richly atmospheric historical drama.',
    language: 'English',
    pages: 448,
    year: 2022,
  },
  {
    id: 'the-startup-myth',
    title: 'The Startup Myth',
    author: 'Rahul Mehta',
    genre: 'Business',
    rating: 4.1,
    cover: '/covers/the-startup-myth.png',
    description:
      'A myth-busting look at what actually drives successful companies, drawn from hundreds of founder interviews. A clear-eyed field guide for builders who want to skip the hype.',
    language: 'English',
    pages: 296,
    year: 2024,
  },
  {
    id: 'beneath-the-willow',
    title: 'Beneath the Willow',
    author: 'Grace Holloway',
    genre: 'Literary Fiction',
    rating: 4.4,
    cover: '/covers/beneath-the-willow.png',
    description:
      'Three generations of women return to their family farmhouse for one final summer, unearthing the tender and painful memories rooted beneath the old willow tree. A quiet, moving portrait of home.',
    language: 'English',
    pages: 358,
    year: 2021,
  },
  {
    id: 'dark-matter-diaries',
    title: 'Dark Matter Diaries',
    author: 'Victor Hale',
    genre: 'Thriller',
    rating: 4.7,
    cover: '/covers/dark-matter-diaries.png',
    description:
      'A disgraced detective is pulled back into service when a series of impossible crimes mirror the pages of an unpublished manuscript. A relentless, twisting thriller you cannot put down.',
    language: 'English',
    pages: 388,
    year: 2023,
  },
]

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id)
}

export function getSimilarBooks(book: Book, limit = 4): Book[] {
  const sameGenre = books.filter((b) => b.genre === book.genre && b.id !== book.id)
  const others = books.filter((b) => b.genre !== book.genre && b.id !== book.id)
  return [...sameGenre, ...others].slice(0, limit)
}

export const trendingBooks = books.slice(0, 6)
export const newReleases = books.filter((b) => b.year >= 2024)
export const recommendedBooks = [...books].sort((a, b) => b.rating - a.rating).slice(0, 6)

export const categories = [
  { name: 'Literary Fiction', count: 128, tint: 'oklch(0.9 0.05 60)' },
  { name: 'Science Fiction', count: 96, tint: 'oklch(0.88 0.06 250)' },
  { name: 'Mystery', count: 84, tint: 'oklch(0.9 0.04 150)' },
  { name: 'Fantasy', count: 142, tint: 'oklch(0.88 0.06 20)' },
  { name: 'Romance', count: 110, tint: 'oklch(0.9 0.05 10)' },
  { name: 'Nonfiction', count: 73, tint: 'oklch(0.92 0.03 90)' },
  { name: 'Historical', count: 65, tint: 'oklch(0.88 0.05 160)' },
  { name: 'Thriller', count: 91, tint: 'oklch(0.85 0.03 60)' },
]

export const mockUser = {
  name: 'Guest',
  handle: '@guest',
  avatar: '/avatar.png',
  joined: 'July 2026',
  booksRead: 0,
  readingGoal: 12,
  bio: 'Discover books, save favorites, and build your reading list.',
}

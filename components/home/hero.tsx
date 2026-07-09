'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { SearchBar } from '@/components/search-bar'

const popular = ['Fantasy', 'Mystery', 'Romance', 'Science Fiction']

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const goToExplore = (q: string) => {
    router.push(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore')
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles size={14} className="text-accent" />
          Discover books across multiple genres
        </span>
        <h1 className="mt-6 font-serif text-4xl leading-tight text-balance sm:text-5xl lg:text-6xl">
          Discover Your Next Favorite Book
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
          Explore hand-picked recommendations, track your reading, and build a library that
          reflects the stories you love.
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={() => goToExplore(query)}
            size="lg"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Popular:</span>
          {popular.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => goToExplore(tag)}
              className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

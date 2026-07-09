'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search by title, author, or genre...',
  size = 'md',
  className,
}: {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  size?: 'md' | 'lg'
  className?: string
}) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
      className={cn(
        'flex items-center gap-3 rounded-full border border-border bg-card shadow-sm transition-shadow focus-within:shadow-md',
        size === 'lg' ? 'px-5 py-3.5' : 'px-4 py-2.5',
        className,
      )}
    >
      <Search className="shrink-0 text-muted-foreground" size={size === 'lg' ? 20 : 18} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search books"
        className={cn(
          'w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground',
          size === 'lg' ? 'text-base' : 'text-sm',
        )}
      />
      {size === 'lg' && (
        <button
          type="submit"
          className="hidden shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:block"
        >
          Search
        </button>
      )}
    </form>
  )
}

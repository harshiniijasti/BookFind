'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Heart, ListChecks, Menu, User, X } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'
import { GoogleButton } from '@/components/google-button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/about', label: 'About' },
]

const iconLinks = [
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/reading-list', label: 'Reading List', icon: ListChecks },
  { href: '/profile', label: 'Profile', icon: User },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { isSignedIn } = useUser()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const handleGuestMode = () => {
    if (typeof window !== 'undefined') {
  localStorage.setItem('guestMode', 'true')
  }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BookOpen size={18} />
          </span>
          <span className="font-serif text-xl font-medium">
            BookFind
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          {iconLinks.map((link) => {
            const Icon = link.icon

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                  isActive(link.href)
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <Icon size={18} />
              </Link>
            )
          })}

          <div className="ml-2 flex items-center gap-2">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <>
                <GoogleButton compact />

                <Link
                  href="/explore"
                  onClick={handleGuestMode}
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Continue as Guest
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 py-4">
            {[...navLinks, ...iconLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 transition-colors hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}

            {!isSignedIn && (
              <div className="flex flex-col gap-2 pt-3">
                <GoogleButton />

                <Link
                  href="/explore"
                  onClick={() => {
                    handleGuestMode()
                    setOpen(false)
                  }}
                  className="rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Continue as Guest
                </Link>
              </div>
            )}

            {isSignedIn && (
              <div className="pt-3">
                <UserButton />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
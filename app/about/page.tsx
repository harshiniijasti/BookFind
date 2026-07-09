import Link from 'next/link'
import { BookOpen, Compass, Heart, ListChecks, Sparkles, Users } from 'lucide-react'
import { GoogleButton } from '@/components/google-button'

const values = [
  {
    icon: Compass,
    title: 'Thoughtful Discovery',
    description:
      'Curated recommendations and rich genre browsing help you find books that actually fit your taste — not just the loudest bestsellers.',
  },
  {
    icon: ListChecks,
    title: 'Effortless Organization',
    description:
      'Keep a clear picture of what you want to read, what you are reading, and what you have finished, with progress tracking built in.',
  },
  {
    icon: Heart,
    title: 'A Library That Is Yours',
    description:
      'Save favorites, set reading goals, and build a personal shelf that reflects the stories you return to again and again.',
  },
]

const stats = [
  { value: '40K+', label: 'Curated titles' },
  { value: '120+', label: 'Genres & subgenres' },
  { value: '1M+', label: 'Reader shelves' },
  { value: '4.8★', label: 'Average app rating' },
]

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles size={14} className="text-accent" />
            About BookFind
          </span>
          <h1 className="mt-6 font-serif text-4xl leading-tight text-balance sm:text-5xl">
            Helping readers find the stories worth their time
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            BookFind is a calmer, more intentional way to discover and organize books. We built it
            for the readers who love the hunt for a great story as much as the story itself.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-3xl text-balance">Our mission</h2>
            <p className="mt-4 leading-relaxed text-foreground/80 text-pretty">
              The world does not lack books — it lacks good ways to find the right ones. BookFind
              cuts through the noise with hand-picked recommendations, honest ratings, and tools
              that make organizing your reading life feel effortless.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/80 text-pretty">
              Whether you are a lifelong bibliophile or just getting back into reading, our goal is
              simple: help you spend less time searching and more time reading.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <p className="font-serif text-3xl text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center font-serif text-3xl text-balance">What we believe</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-accent-foreground">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-20 overflow-hidden rounded-3xl border border-border bg-primary px-6 py-14 text-center text-primary-foreground sm:px-10">
          <Users size={28} className="mx-auto opacity-90" />
          <h2 className="mt-5 font-serif text-3xl text-balance">Join a community of readers</h2>
          <p className="mx-auto mt-3 max-w-lg leading-relaxed opacity-80 text-pretty">
            Start building your library today. Sign in to sync your shelves, or jump straight in as
            a guest — no commitment required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GoogleButton />
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-transparent px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <BookOpen size={16} />
              Continue as Guest
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

import { newReleases, recommendedBooks, trendingBooks } from '@/lib/data'
import { Hero } from '@/components/home/hero'
import { CategorySection } from '@/components/home/category-section'
import { BookGrid } from '@/components/book-grid'
import { SectionHeader } from '@/components/section-header'

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <SectionHeader
            title="Trending This Week"
            subtitle="The books everyone is talking about right now."
            href="/explore"
          />
          <BookGrid books={trendingBooks} />
        </section>

        <section>
          <SectionHeader
            title="New Releases"
            subtitle="Fresh off the press and ready for your shelf."
            href="/explore"
          />
          <BookGrid books={newReleases} />
        </section>

        <section>
           <SectionHeader
              title="Recommended For You"
              subtitle="Discover books recommended for every type of reader."
              href="/explore"
            />
            <BookGrid books={recommendedBooks} />
          </section>

        <CategorySection />
      </div>
    </>
  )
}

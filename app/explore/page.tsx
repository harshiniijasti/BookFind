import { ExploreView } from '@/components/explore/explore-view'

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>
}) {
  const params = await searchParams
  return <ExploreView initialQuery={params.q ?? ''} initialGenre={params.genre ?? 'All'} />
}

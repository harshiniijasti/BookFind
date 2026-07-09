import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RatingStars({
  rating,
  showValue = true,
  size = 14,
  className,
}: {
  rating: number
  showValue?: boolean
  size?: number
  className?: string
}) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75
  const rounded = rating - full >= 0.75 ? full + 1 : full

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFull = i < (hasHalf ? full : rounded)
          const isHalf = hasHalf && i === full
          return (
            <span key={i} className="relative inline-flex">
              <Star size={size} className="text-border" fill="currentColor" strokeWidth={0} />
              {(isFull || isHalf) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isHalf ? '50%' : '100%' }}
                >
                  <Star
                    size={size}
                    className="text-accent"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </span>
              )}
            </span>
          )
        })}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-muted-foreground">{rating.toFixed(1)}</span>
      )}
      <span className="sr-only">{`Rated ${rating.toFixed(1)} out of 5`}</span>
    </div>
  )
}

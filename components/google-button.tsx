'use client'

import { SignInButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 3.47 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}

type GoogleButtonProps = {
  compact?: boolean
  className?: string
}

export function GoogleButton({
  compact = false,
  className,
}: GoogleButtonProps) {
  const handleGoogleLogin = () => {
    if (typeof window !== 'undefined') {
  localStorage.removeItem('guestMode')
  }
  }

  return (
    <SignInButton mode="modal" forceRedirectUrl="/">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90',
          compact ? 'px-4 py-2' : 'px-4 py-2.5',
          className,
        )}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background">
          <GoogleIcon size={14} />
        </span>

        {compact ? 'Google' : 'Continue with Google'}
      </button>
    </SignInButton>
  )
}
'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
    </>
  )
} 
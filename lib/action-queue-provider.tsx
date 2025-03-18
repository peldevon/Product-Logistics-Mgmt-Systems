'use client'

import { createContext, useContext, useRef, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface ActionQueueContextType {
  router: ReturnType<typeof useRouter>
  actionQueue: any[]
}

const ActionQueueContext = createContext<ActionQueueContextType | null>(null)

interface ActionQueueProviderProps {
  children: ReactNode
  router: ReturnType<typeof useRouter>
}

export function ActionQueueProvider({ children, router }: ActionQueueProviderProps) {
  const actionQueueRef = useRef<any[]>([])

  return (
    <ActionQueueContext.Provider
      value={{
        router,
        actionQueue: actionQueueRef.current,
      }}
    >
      {children}
    </ActionQueueContext.Provider>
  )
}

export function useActionQueue() {
  const context = useContext(ActionQueueContext)
  if (!context) {
    throw new Error('useActionQueue must be used within an ActionQueueProvider')
  }
  return context
} 
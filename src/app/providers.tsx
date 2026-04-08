import { ReactNode, useEffect } from 'react'
import { useAppStore, selectSnapshot } from '../entities/layer/model/store'
import { readSnapshot, writeSnapshot } from '../shared/services/storageService'

type Props = { children: ReactNode }

const PERSIST_DEBOUNCE_MS = 200

export const Providers = ({ children }: Props) => {
  useEffect(() => {
    const snapshot = readSnapshot()
    if (snapshot) {
      useAppStore.getState().hydrateFromSnapshot(snapshot)
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const unsubscribe = useAppStore.subscribe((state) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        writeSnapshot(selectSnapshot(state))
      }, PERSIST_DEBOUNCE_MS)
    })

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      unsubscribe()
    }
  }, [])

  return children
}

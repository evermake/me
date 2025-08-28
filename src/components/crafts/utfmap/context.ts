import { createContext } from 'react'

export interface MapperContextValue {
  text: string
  setText: (newText: string) => void
}

export const MapperContext = createContext<MapperContextValue>(null as any)

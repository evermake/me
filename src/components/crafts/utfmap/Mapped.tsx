import type { Mapping } from './map'
import { use } from 'react'
import { MapperContext } from './context'
import { makeMap } from './map'

export interface MappedProps {
  prefix?: string
  mappings: Mapping[]
}

export function Mapped({ prefix = '', mappings }: MappedProps) {
  const { text } = use(MapperContext)
  const map = makeMap(...mappings)
  return (
    <span>{map(text || prefix)}</span>
  )
}

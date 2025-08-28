import { use } from 'react'
import { MapperContext } from './context'

export function Input() {
  const { text, setText } = use(MapperContext)

  return (
    <input
      value={text}
      placeholder="Type something..."
      onChange={e => setText(e.target.value)}
    />
  )
}

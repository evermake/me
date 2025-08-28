import type { Mapping } from './map'
import { useMemo, useState } from 'react'
import { MapperContext } from './context'
import { Input } from './Input'
import { Mapped } from './Mapped'

const MATHEMATICAL_BOLD: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝐀', '𝐙'] },
  { from: ['a', 'z'], to: ['𝐚', '𝐳'] },
  { from: ['0', '9'], to: ['𝟎', '𝟗'] },
]
const MATHEMATICAL_ITALIC: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝐴', '𝑍'] },
  { from: ['a', 'z'], to: ['𝑎', '𝑧'], exclude: [0x1D455] },
]
const MATHEMATICAL_BOLD_ITALIC: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝑨', '𝒁'] },
  { from: ['a', 'z'], to: ['𝒂', '𝒛'] },
]
const MATHEMATICAL_SCRIPT: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝒜', '𝒵'], exclude: [0x1D49D, 0x1D4A0, 0x1D4A1, 0x1D4A3, 0x1D4A4, 0x1D4A7, 0x1D4A8, 0x1D4AD] },
  { from: ['a', 'z'], to: ['𝒶', '𝓏'], exclude: [0x1D4BA, 0x1D4BC, 0x1D4C4] },
]
const MATHEMATICAL_BOLD_SCRIPT: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝓐', '𝓩'] },
  { from: ['a', 'z'], to: ['𝓪', '𝔃'] },
]
const MATHEMATICAL_FRAKTUR: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝔄', 0x1D51D], exclude: [0x1D506, 0x1D50B, 0x1D50C, 0x1D515, 0x1D51D] },
  { from: ['a', 'z'], to: ['𝔞', '𝔷'] },
]
const MATHEMATICAL_BOLD_FRAKTUR: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝕬', '𝖅'] },
  { from: ['a', 'z'], to: ['𝖆', '𝖟'] },
]
const MATHEMATICAL_DOUBLE_STRUCK: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝔸', 0x1D551], exclude: [0x1D53A, 0x1D53F, 0x1D545, 0x1D547, 0x1D548, 0x1D549, 0x1D551] },
  { from: ['a', 'z'], to: ['𝕒', '𝕫'] },
  { from: ['0', '9'], to: ['𝟘', '𝟡'] },
]
const MATHEMATICAL_SANS_SERIF: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝖠', '𝖹'] },
  { from: ['a', 'z'], to: ['𝖺', '𝗓'] },
  { from: ['0', '9'], to: ['𝟢', '𝟫'] },
]
const MATHEMATICAL_SANS_SERIF_BOLD: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝗔', '𝗭'] },
  { from: ['a', 'z'], to: ['𝗮', '𝘇'] },
  { from: ['0', '9'], to: ['𝟬', '𝟵'] },
]
const MATHEMATICAL_MONOSPACE: Mapping[] = [
  { from: ['A', 'Z'], to: ['𝙰', '𝚉'] },
  { from: ['a', 'z'], to: ['𝚊', '𝚣'] },
  { from: ['0', '9'], to: ['𝟶', '𝟿'] },
]

function Page() {
  const [text, setText] = useState('')
  const contextValue = useMemo(() => ({ text, setText }), [text])

  return (
    <div>
      <MapperContext value={contextValue}>
        <Input />
        <ul>
          <li><Mapped prefix="Mathematical Bold" mappings={MATHEMATICAL_BOLD} /></li>
          <li><Mapped prefix="Mathematical Italic" mappings={MATHEMATICAL_ITALIC} /></li>
          <li><Mapped prefix="Mathematical Bold Italic" mappings={MATHEMATICAL_BOLD_ITALIC} /></li>
          <li><Mapped prefix="Mathematical Script" mappings={MATHEMATICAL_SCRIPT} /></li>
          <li><Mapped prefix="Mathematical Bold Script" mappings={MATHEMATICAL_BOLD_SCRIPT} /></li>
          <li><Mapped prefix="Mathematical Fraktur" mappings={MATHEMATICAL_FRAKTUR} /></li>
          <li><Mapped prefix="Mathematical Bold Fraktur" mappings={MATHEMATICAL_BOLD_FRAKTUR} /></li>
          <li><Mapped prefix="Mathematical Sans Serif" mappings={MATHEMATICAL_SANS_SERIF} /></li>
          <li><Mapped prefix="Mathematical Sans Serif Bold" mappings={MATHEMATICAL_SANS_SERIF_BOLD} /></li>
          <li><Mapped prefix="Mathematical Double Struck" mappings={MATHEMATICAL_DOUBLE_STRUCK} /></li>
          <li><Mapped prefix="Mathematical Monospace" mappings={MATHEMATICAL_MONOSPACE} /></li>
        </ul>
      </MapperContext>
    </div>
  )
}

export default Page

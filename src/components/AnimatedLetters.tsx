import type { CSSProperties } from 'react'
import styles from './AnimatedLetters.module.css'

type Props = {
  text: string
}

function AnimatedLetters({ text }: Props) {
  return (
    <div className={styles.container}>
      {text.split('').map((letter, idx) => (
        <span key={idx} style={{ '--i': idx } as CSSProperties}>
          {letter}
        </span>
      ))}
    </div>
  )
}

export default AnimatedLetters

export type CodePoint = number | string

export interface Mapping {
  from: [CodePoint, CodePoint]
  to: [CodePoint, CodePoint]
  exclude?: CodePoint[]
}

/**
 * Creates a function that transforms a given string by mapping characters
 * according to the provided mappings. Each mapping defines a range
 * transformation from one character range to another. Characters outside all
 * input ranges are left unchanged.
 *
 * @example
 * ```js
 * const map = makeMap({ from: ['a', 'z'], to: ['A', 'Z']});
 * map('Hello, world!'); // 'HELLO, WORLD!'
 * ```
 *
 * @example
 * ```js
 * const map = makeMap({ from: ['1', '9'], to: ['a', 'i'] });
 * map('123456789'); // 'abcdefghi'
 * ```
 */
export function makeMap(
  ...mappings: Mapping[]
): ((str: string) => string) {
  const cps = mappings.map(({ from, to, exclude }) => {
    const [in1, in2] = from
    const [out1, out2] = to
    const cp1 = codePoint(in1)
    const cp2 = codePoint(in2)
    const cp3 = codePoint(out1)
    const cp4 = codePoint(out2)
    if (Math.abs(cp1 - cp2) !== Math.abs(cp3 - cp4)) {
      throw new Error(`Range sizes are not the same: ${cp1}..${cp2} and ${cp3}..${cp4}`)
    }
    const diff = cp3 - cp1
    return [cp1, cp2, diff, new Set(exclude?.map(codePoint))] as const
  })
  return (str: string) => {
    return String.fromCodePoint(...([...str]).map((ch) => {
      const cp = ch.codePointAt(0)!
      for (const [cp1, cp2, diff, exclude] of cps) {
        if (cp1 <= cp && cp <= cp2) {
          if (exclude.has(cp + diff))
            return cp
          return cp + diff
        }
      }
      return cp
    }))
  }
}

function codePoint(cp: CodePoint): number {
  const res = typeof cp === 'number' ? cp : [...cp][0].codePointAt(0)
  if (res === undefined)
    throw new Error(`Invalid code point: ${cp}`)
  return res
}

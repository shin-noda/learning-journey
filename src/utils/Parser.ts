import type { JournalEntry } from "../type/JournalEntry"

type Frontmatter = Omit<JournalEntry, 'content'>
type ArrayKey = 'objectives' | 'categories' | 'actions'

const ARRAY_KEYS: Set<string> = new Set(['objectives', 'categories', 'actions'])

export const Parser = (raw: string) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  
  if (!match) {
    return { data: {} as Frontmatter, content: raw }
  }

  const [fullMatch, yamlBlock] = match
  const content = raw.slice(fullMatch.length).trim()
  const data: Partial<Frontmatter> = {}

  let currentKey: ArrayKey | null = null

  yamlBlock.split('\n').forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed) return

    // 1. Handle Array Items (starts with "-")
    if (trimmed.startsWith('-') && currentKey) {
      const item = trimmed.slice(1).trim()
      const list = data[currentKey] as string[]
      if (item) list.push(item)
      return
    }

    // 2. Handle Key-Value pairs
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) return

    const key = line.slice(0, separatorIndex).trim() as keyof Frontmatter
    const value = line.slice(separatorIndex + 1).trim()

    if (ARRAY_KEYS.has(key)) {
      currentKey = key as ArrayKey
      data[currentKey] = []
    } else {
      currentKey = null
      // Assign value directly for non-array keys (date, title, summary, etc.)
      if (value) (data[key] as string) = value
    }
  })

  return { data: data as Frontmatter, content }
}
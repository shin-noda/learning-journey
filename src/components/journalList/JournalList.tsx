import { useEffect, useState } from 'react'
import Journal from '../journal/Journal'
import { Parser } from '../../utils/Parser'
import type { JournalEntry } from '../../type/JournalEntry'
import './JournalList.css'


const JournalList = () => {
    const [journals, setJournals] = useState<JournalEntry[]>([])

    useEffect(() => {
        const loadJournals = async () => {
            const files = import.meta.glob('/src/data/*.md', {
                as: 'raw'
            })

            const entries: JournalEntry[] = []

            for (const path in files) {
                const fileContent = await files[path]()
                const { data, content } = Parser(fileContent as string)

                entries.push({
                    ...(data as Omit<JournalEntry, 'content'>),
                    content
                })
            }

            // Sort newest first
            entries.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )

            setJournals(entries)
        }

        loadJournals()
    }, [])

    return (
        <div className="journal-list">
            {journals.map((journal, index) => (
                <Journal key={index} journal={journal} />
            ))}
        </div>
    )
}

export default JournalList
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
                query: '?raw',
                import: 'default' 
            })

            const entries: JournalEntry[] = []

            for (const path in files) {
                const fileContent = await files[path]()
                const { data } = Parser(fileContent as string)

                entries.push({
                    ...(data as JournalEntry)
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
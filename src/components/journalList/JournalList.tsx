import { useEffect, useState } from 'react'
import Journal from '../journal/Journal'
import Pagination from '../pagination/Pagination'

import type { JournalEntry } from '../../type/JournalEntry'

import { getPaginatedItems } from '../../utils/pagination'
import { Parser } from '../../utils/Parser'

import './JournalList.css'

const JournalList = () => {
    const [journals, setJournals] = useState<JournalEntry[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const { paginatedItems, totalPages } = getPaginatedItems(journals, currentPage, 10)

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
            {paginatedItems.map((j) => (
                <Journal 
                    key={`${j.date}-${j.title}`} 
                    journal={j} 
                />
            ))}
            
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
        </div>
    )
}

export default JournalList
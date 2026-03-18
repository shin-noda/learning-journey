import type { JournalEntry } from "../../type/JournalEntry"
import './Journal.css'

type Props = {
    journal: JournalEntry
}

const Journal = ({ journal }: Props) => {
    return (
        <div className="journal">
            <h2 className="journal-title">{journal.title}</h2>
            <p className="journal-date">{journal.date}</p>

            <div className="journal-objectives">
                <strong className="journal-objectives-title">Objectives</strong>
                <ul>
                    {journal.objectives.map((obj, index) => (
                        <li key={index}>{obj}</li>
                    ))}
                </ul>
            </div>

            <div className="journal-categories">
                <strong className="journal-categories-title">Categories</strong>
                <ul>
                    {journal.categories.map((cat, index) => (
                        <li key={index}>{cat}</li>
                    ))}
                </ul>
            </div>

            <div className="journal-actions">
                <strong className="journal-actions-title">Key Actions</strong>
                <ul>
                    {journal.actions.map((act, index) => (
                        <li key={index}>{act}</li>
                    ))}
                </ul>
            </div>

            <p className="journal-summary">
                <strong className="journal-summary-title">Summary</strong>
                {journal.summary}
            </p>
        </div>
    )
}

export default Journal
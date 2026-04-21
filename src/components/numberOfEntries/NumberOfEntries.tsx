import { useActivityData } from '../../hooks/useActivityData'
import './NumberOfEntries.css'

const NumberOfEntries = () => {
    const { activityData, isLoading } = useActivityData()

    const generateDays = () => {
        const days = []
        const today = new Date()
        // Normalize today to midnight so we don't have hour/minute comparison issues
        today.setHours(0, 0, 0, 0)
        
        const startDate = new Date(today)
        startDate.setDate(today.getDate() - 364)
        startDate.setDate(startDate.getDate() - startDate.getDay())

        const endDate = new Date(today)
        endDate.setDate(today.getDate() + (6 - today.getDay()))

        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0]
            const count = activityData[dateStr] || 0
            
            let level = 0
            if (count > 0 && count <= 2) level = 1
            else if (count > 2 && count <= 4) level = 2
            else if (count > 4 && count <= 5) level = 3
            else if (count > 5) level = 4

            days.push({ 
                date: dateStr, 
                level, 
                count,
                // Compare time values to see if it's strictly after today
                isFuture: currentDate.getTime() > today.getTime()
            });

            currentDate.setDate(currentDate.getDate() + 1)
        }
        return days
    }

    if (isLoading) return <div>Loading Journey...</div>

    return (
        <div className="number-of-entries">
            <span className="calendar-title">Number of entries</span>
            <div className="calendar-container">
                <div className="calendar-entries">
                    {generateDays().map((day, index) => {
                        // If it's the future, render a placeholder with no color/border
                        if (day.isFuture) {
                            return <div key={index} className="day-block-hidden" />
                        }

                        // Otherwise, render your beautiful Genmai-cha block
                        return (
                            <div 
                                key={`${day.date}-${index}`} 
                                className={`day-block level-${day.level}`}
                                title={`${day.date}: ${day.count} actions`}
                            />
                        );
                    })}
                </div>
            </div>
            
            <div className="calendar-legend">
                <span>Less</span>
                <div className="day-block level-0"></div>
                <div className="day-block level-1"></div>
                <div className="day-block level-2"></div>
                <div className="day-block level-3"></div>
                <div className="day-block level-4"></div>
                <span>More</span>
            </div>
        </div>
    )
}

export default NumberOfEntries
import { useEffect, useState } from 'react'
import { Parser } from '../utils/Parser'

export const useActivityData = () => {
    const [activityData, setActivityData] = useState<Record<string, number>>({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadActivity = async () => {
            const files = import.meta.glob('/src/data/*.md', {
                query: '?raw',
                import: 'default' 
            })

            const dataMap: Record<string, number> = {}

            for (const path in files) {
                const fileContent = await files[path]()
                const { data } = Parser(fileContent as string)

                if (data.date) {
                    const actionCount = data.actions ? data.actions.length : 0
                    dataMap[data.date] = actionCount
                }
            }

            setActivityData(dataMap)
            setIsLoading(false)
        }

        loadActivity()
    }, [])

    return { activityData, isLoading }
}
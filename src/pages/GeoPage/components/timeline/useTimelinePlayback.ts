import { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, setSelectedTimeIndex } from '@/store/map-store.ts'

export interface UseTimelinePlaybackResult {
    isPlaying: boolean
    onTogglePlay: () => unknown
    goToIndex: (index: number) => unknown
    onStepPrev: () => unknown
    onStepNext: () => unknown
}

export const useTimelinePlayback = (selectedIndex: number, timePointsCount: number): UseTimelinePlaybackResult => {
    const dispatch = useDispatch()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const goToIndex = useCallback(
        (index: number) => {
            const bounded = Math.max(0, Math.min(index, timePointsCount - 1))
            setSelectedTimeIndex(dispatch, bounded)
        },
        [dispatch, timePointsCount],
    )

    const onStepPrev = useCallback(() => {
        goToIndex(selectedIndex - 1)
    }, [goToIndex, selectedIndex])

    const onStepNext = useCallback(() => {
        goToIndex(selectedIndex + 1)
    }, [goToIndex, selectedIndex])

    const onTogglePlay = () => {
        setIsPlaying(prev => !prev)
    }

    useEffect(() => {
        if (!isPlaying) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            return
        }

        intervalRef.current = setInterval(() => {
            dispatch(state => {
                const next = (state.selectedTimeIndex + 1) % state.timePoints.length
                return { selectedTimeIndex: next }
            })
        }, 1000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [isPlaying, dispatch])

    return {
        isPlaying,
        onTogglePlay,
        goToIndex,
        onStepPrev,
        onStepNext,
    }
}

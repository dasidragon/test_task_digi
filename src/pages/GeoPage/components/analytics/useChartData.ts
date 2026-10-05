import { useMemo } from 'react'
import type { ChartPoint, LayerTimeSeries, TemperatureObservation, WindObservation, InsolationObservation } from '@/api/geo/GeoModel.ts'

export interface UseChartDataProps {
    timePoints: string[]
    tempData: LayerTimeSeries<TemperatureObservation> | null
    windData: LayerTimeSeries<WindObservation> | null
    insolationData: LayerTimeSeries<InsolationObservation> | null
}

export const useChartData = ({ timePoints, tempData, windData, insolationData }: UseChartDataProps): ChartPoint[] => {
    return useMemo(() => {
        return timePoints.map((time, idx) => {
            const point: ChartPoint = { time }

            const tempSnap = tempData?.snapshots[idx]
            if (tempSnap && tempSnap.data.length > 0) {
                const total = tempSnap.data.reduce((sum, item) => sum + item.value, 0)
                point.temperature = parseFloat((total / tempSnap.data.length).toFixed(1))
            }

            const windSnap = windData?.snapshots[idx]
            if (windSnap && windSnap.data.length > 0) {
                const total = windSnap.data.reduce((sum, item) => sum + item.speed, 0)
                point.wind = parseFloat((total / windSnap.data.length).toFixed(1))
            }

            const insolationSnap = insolationData?.snapshots[idx]
            if (insolationSnap && insolationSnap.data.length > 0) {
                const total = insolationSnap.data.reduce((sum, item) => sum + item.value, 0)
                point.insolation = Math.round(total / insolationSnap.data.length)
            }

            return point
        })
    }, [timePoints, tempData, windData, insolationData])
}

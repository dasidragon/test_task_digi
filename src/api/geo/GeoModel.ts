export type LayerType = 'temperature' | 'wind' | 'insolation'

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error'

export interface StationLocation {
    id: string
    name: string
    district: string
    lat: number
    lng: number
}

export interface TemperatureObservation extends StationLocation {
    value: number
    unit: string
}

export interface WindObservation extends StationLocation {
    speed: number
    direction: number
    unit: string
}

export interface InsolationObservation extends StationLocation {
    value: number
    unit: string
}

export interface LayerSnapshot<T> {
    time: string
    data: T[]
}

export interface LayerTimeSeries<T> {
    snapshots: LayerSnapshot<T>[]
}

export interface LayerState {
    id: LayerType
    title: string
    visible: boolean
    loadingStatus: LoadingStatus
    color: string
}

export interface LayersMap {
    temperature: LayerState
    wind: LayerState
    insolation: LayerState
}

export interface AppState {
    selectedTimeIndex: number
    timePoints: string[]
    globalLoading: boolean
    layers: LayersMap
    temperatureData: LayerTimeSeries<TemperatureObservation> | null
    windData: LayerTimeSeries<WindObservation> | null
    insolationData: LayerTimeSeries<InsolationObservation> | null
}

export interface ChartPoint {
    time: string
    temperature?: number
    wind?: number
    insolation?: number
}

export interface ChartClickPayload {
    activeLabel?: string | number
}

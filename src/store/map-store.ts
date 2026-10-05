import { createVedro } from 'vedro'
import type { Vedro } from 'vedro/lib/_Vedro'
import type {
    AppState,
    LayerType,
    LayerTimeSeries,
    TemperatureObservation,
    WindObservation,
    InsolationObservation,
    LoadingStatus,
} from '@/api/geo/GeoModel'
import { TIME_POINTS } from '@/api/geo/geo.mock'

export type Dispatch = Vedro<AppState>['dispatch']

const initialState: AppState = {
    selectedTimeIndex: 2,
    timePoints: TIME_POINTS,
    globalLoading: false,
    layers: {
        temperature: {
            id: 'temperature',
            title: 'Температура',
            visible: true,
            loadingStatus: 'idle',
            color: '#ff6b35',
        },
        wind: {
            id: 'wind',
            title: 'Ветер',
            visible: true,
            loadingStatus: 'idle',
            color: '#4fc3f7',
        },
        insolation: {
            id: 'insolation',
            title: 'Инсоляция',
            visible: true,
            loadingStatus: 'idle',
            color: '#ffd700',
        },
    },
    temperatureData: null,
    windData: null,
    insolationData: null,
}

export const { Provider: MapStoreProvider, useStore, useSelector, useDispatch } = createVedro<AppState>(initialState)

export const setSelectedTimeIndex = (dispatch: Dispatch, index: number) => {
    dispatch({ selectedTimeIndex: index })
}

export const toggleLayerVisibility = (dispatch: Dispatch, layerId: LayerType) => {
    dispatch(state => ({
        layers: {
            ...state.layers,
            [layerId]: {
                ...state.layers[layerId],
                visible: !state.layers[layerId].visible,
            },
        },
    }))
}

export const setLayerVisibility = (dispatch: Dispatch, layerId: LayerType, visible: boolean) => {
    dispatch(state => ({
        layers: {
            ...state.layers,
            [layerId]: {
                ...state.layers[layerId],
                visible,
            },
        },
    }))
}

export const setLayerLoadingStatus = (dispatch: Dispatch, layerId: LayerType, status: LoadingStatus) => {
    dispatch(state => ({
        layers: {
            ...state.layers,
            [layerId]: {
                ...state.layers[layerId],
                loadingStatus: status,
            },
        },
    }))
}

export const setGlobalLoading = (dispatch: Dispatch, loading: boolean) => {
    dispatch({ globalLoading: loading })
}

export const setTemperatureData = (dispatch: Dispatch, data: LayerTimeSeries<TemperatureObservation>) => {
    dispatch({ temperatureData: data })
}

export const setWindData = (dispatch: Dispatch, data: LayerTimeSeries<WindObservation>) => {
    dispatch({ windData: data })
}

export const setInsolationData = (dispatch: Dispatch, data: LayerTimeSeries<InsolationObservation>) => {
    dispatch({ insolationData: data })
}

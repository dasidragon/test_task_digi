import { useEffect, useRef } from 'react'
import {
    useDispatch,
    useSelector,
    setLayerLoadingStatus,
    setTemperatureData,
    setWindData,
    setInsolationData,
    setGlobalLoading,
    type Dispatch,
} from '@/store/map-store.ts'
import type { LayerType } from '@/api/geo/GeoModel'
import {
    fetchTemperatureData,
    fetchWindData,
    fetchInsolationData,
} from '@/api/geo/GeoController'

const loadSingleLayer = async (dispatch: Dispatch, layerId: LayerType) => {
    setLayerLoadingStatus(dispatch, layerId, 'loading')
    try {
        if (layerId === 'temperature') {
            const data = await fetchTemperatureData()
            setTemperatureData(dispatch, data)
        } else if (layerId === 'wind') {
            const data = await fetchWindData()
            setWindData(dispatch, data)
        } else {
            const data = await fetchInsolationData()
            setInsolationData(dispatch, data)
        }
        setLayerLoadingStatus(dispatch, layerId, 'success')
    } catch {
        setLayerLoadingStatus(dispatch, layerId, 'error')
    }
}

const loadAllLayers = async (dispatch: Dispatch, needed: LayerType[]) => {
    setGlobalLoading(dispatch, true)
    await Promise.all(needed.map(id => loadSingleLayer(dispatch, id)))
    setGlobalLoading(dispatch, false)
}

export const useLayerLoader = () => {
    const dispatch = useDispatch()
    const layers = useSelector(s => s.layers)
    const tempData = useSelector(s => s.temperatureData)
    const windData = useSelector(s => s.windData)
    const insolationData = useSelector(s => s.insolationData)
    const fetched = useRef<Set<LayerType>>(new Set())

    useEffect(() => {
        const toLoad: LayerType[] = []

        if (layers.temperature.visible && !tempData && !fetched.current.has('temperature')) {
            fetched.current.add('temperature')
            toLoad.push('temperature')
        }

        if (layers.wind.visible && !windData && !fetched.current.has('wind')) {
            fetched.current.add('wind')
            toLoad.push('wind')
        }

        if (layers.insolation.visible && !insolationData && !fetched.current.has('insolation')) {
            fetched.current.add('insolation')
            toLoad.push('insolation')
        }

        if (toLoad.length > 0) {
            loadAllLayers(dispatch, toLoad)
        }
    }, [dispatch, layers.temperature.visible, layers.wind.visible, layers.insolation.visible, tempData, windData, insolationData])
}

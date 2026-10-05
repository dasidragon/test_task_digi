import { useEffect } from 'react'
import type { Map, GeoJSONSource } from 'maplibre-gl'
import type { LayerTimeSeries, TemperatureObservation, WindObservation, InsolationObservation, LayersMap } from '@/api/geo/GeoModel.ts'
import { toInsolationGeoJSON, toTemperatureGeoJSON, toWindGeoJSON } from '@/api/geo/GeoController.ts'
import { MAP_LAYERS, MAP_SOURCES } from '@/consts.ts'

export interface UseMapboxLayersSyncProps {
    map: Map | null
    isMapLoaded: boolean
    selectedTimeIndex: number
    layers: LayersMap
    temperatureData: LayerTimeSeries<TemperatureObservation> | null
    windData: LayerTimeSeries<WindObservation> | null
    insolationData: LayerTimeSeries<InsolationObservation> | null
}

export const useMapboxLayersSync = ({
    map,
    isMapLoaded,
    selectedTimeIndex,
    layers,
    temperatureData,
    windData,
    insolationData,
}: UseMapboxLayersSyncProps) => {
    useEffect(() => {
        if (!map || !isMapLoaded || !temperatureData) {
            return
        }
        const snapshot = temperatureData.snapshots[selectedTimeIndex]
        if (!snapshot) {
            return
        }
        const source = map.getSource(MAP_SOURCES.TEMPERATURE) as GeoJSONSource | undefined
        if (source) {
            source.setData(toTemperatureGeoJSON(snapshot))
        }
    }, [map, isMapLoaded, selectedTimeIndex, temperatureData])

    useEffect(() => {
        if (!map || !isMapLoaded || !windData) {
            return
        }
        const snapshot = windData.snapshots[selectedTimeIndex]
        if (!snapshot) {
            return
        }
        const source = map.getSource(MAP_SOURCES.WIND) as GeoJSONSource | undefined
        if (source) {
            source.setData(toWindGeoJSON(snapshot))
        }
    }, [map, isMapLoaded, selectedTimeIndex, windData])

    useEffect(() => {
        if (!map || !isMapLoaded || !insolationData) {
            return
        }
        const snapshot = insolationData.snapshots[selectedTimeIndex]
        if (!snapshot) {
            return
        }
        const source = map.getSource(MAP_SOURCES.INSOLATION) as GeoJSONSource | undefined
        if (source) {
            source.setData(toInsolationGeoJSON(snapshot))
        }
    }, [map, isMapLoaded, selectedTimeIndex, insolationData])

    useEffect(() => {
        if (!map || !isMapLoaded) {
            return
        }
        const visibility = layers.temperature.visible ? 'visible' : 'none'
        const layerIds = [MAP_LAYERS.TEMPERATURE_HEAT, MAP_LAYERS.TEMPERATURE_CIRCLE, MAP_LAYERS.TEMPERATURE_LABEL]
        layerIds.forEach(id => {
            if (map.getLayer(id)) {
                map.setLayoutProperty(id, 'visibility', visibility)
            }
        })
    }, [map, isMapLoaded, layers.temperature.visible])

    useEffect(() => {
        if (!map || !isMapLoaded) {
            return
        }
        const visibility = layers.wind.visible ? 'visible' : 'none'
        const layerIds = [MAP_LAYERS.WIND_CIRCLE, MAP_LAYERS.WIND_LABEL]
        layerIds.forEach(id => {
            if (map.getLayer(id)) {
                map.setLayoutProperty(id, 'visibility', visibility)
            }
        })
    }, [map, isMapLoaded, layers.wind.visible])

    useEffect(() => {
        if (!map || !isMapLoaded) {
            return
        }
        const visibility = layers.insolation.visible ? 'visible' : 'none'
        const layerIds = [MAP_LAYERS.INSOLATION_HEAT, MAP_LAYERS.INSOLATION_CIRCLE]
        layerIds.forEach(id => {
            if (map.getLayer(id)) {
                map.setLayoutProperty(id, 'visibility', visibility)
            }
        })
    }, [map, isMapLoaded, layers.insolation.visible])
}

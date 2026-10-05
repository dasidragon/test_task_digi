import { useEffect, useRef, useState, type RefObject } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import 'maplibre-gl/dist/maplibre-gl-shared.mjs?url'
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'
import { initTemperatureLayers, initWindLayers, initInsolationLayers } from './consts.ts'
import { BISHKEK_COORDINATES, MAP_STYLE_URL } from '@/consts.ts'

if (typeof window !== 'undefined') {
    maplibregl.setWorkerUrl(maplibreWorkerUrl)
}

export interface UseMapboxMapResult {
    mapInstance: maplibregl.Map | null
    isMapLoaded: boolean
    mapError: string | null
}

export const useMapboxMap = (containerRef: RefObject<HTMLDivElement | null>): UseMapboxMapResult => {
    const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null)
    const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false)
    const [mapError, setMapError] = useState<string | null>(null)
    const isInitialized = useRef<boolean>(false)

    useEffect(() => {
        if (!containerRef.current || isInitialized.current) {
            return
        }
        isInitialized.current = true

        try {
            const map = new maplibregl.Map({
                container: containerRef.current,
                style: MAP_STYLE_URL,
                center: BISHKEK_COORDINATES,
                zoom: 11.5,
                pitch: 0,
                bearing: 0,
            })

            map.addControl(new maplibregl.NavigationControl(), 'top-right')
            map.addControl(new maplibregl.ScaleControl(), 'bottom-left')
            map.addControl(new maplibregl.FullscreenControl(), 'top-right')

            map.on('load', () => {
                try {
                    initTemperatureLayers(map)
                    initWindLayers(map)
                    initInsolationLayers(map)

                    setMapInstance(map)
                    setIsMapLoaded(true)
                } catch (err: unknown) {
                    const message = err instanceof Error ? err.message : 'Ошибка инициализации слоев карты'
                    setMapError(message)
                }
            })

            map.on('error', event => {
                if (event.error) {
                    setMapError(event.error.message)
                }
            })
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Ошибка создания карты Mapbox GL'
            setMapError(message)
        }

        return () => {
            if (mapInstance) {
                mapInstance.remove()
            }
        }
    }, [containerRef])

    return {
        mapInstance,
        isMapLoaded,
        mapError,
    }
}

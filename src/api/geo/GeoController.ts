import type { FeatureCollection, Feature, Point } from 'geojson'
import type {
    LayerTimeSeries,
    TemperatureObservation,
    WindObservation,
    InsolationObservation,
    LayerSnapshot,
    StationLocation,
} from './GeoModel'
import { TIME_POINTS, TEMPERATURE_STATIONS, WIND_STATIONS, INSOLATION_STATIONS } from './geo.mock'

const delay = async (ms: number) => {
    await new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const createPointFeature = <T extends StationLocation>(item: T, properties: Record<string, string | number>): Feature<Point> => ({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [item.lng, item.lat],
    },
    properties,
})

export const toTemperatureGeoJSON = (snapshot: LayerSnapshot<TemperatureObservation>): FeatureCollection => ({
    type: 'FeatureCollection',
    features: snapshot.data.map(obs =>
        createPointFeature(obs, {
            id: obs.id,
            name: obs.name,
            district: obs.district,
            value: obs.value,
            unit: obs.unit,
        }),
    ),
})

export const toWindGeoJSON = (snapshot: LayerSnapshot<WindObservation>): FeatureCollection => ({
    type: 'FeatureCollection',
    features: snapshot.data.map(obs =>
        createPointFeature(obs, {
            id: obs.id,
            name: obs.name,
            district: obs.district,
            speed: obs.speed,
            direction: obs.direction,
            unit: obs.unit,
        }),
    ),
})

export const toInsolationGeoJSON = (snapshot: LayerSnapshot<InsolationObservation>): FeatureCollection => ({
    type: 'FeatureCollection',
    features: snapshot.data.map(obs =>
        createPointFeature(obs, {
            id: obs.id,
            name: obs.name,
            district: obs.district,
            value: obs.value,
            unit: obs.unit,
        }),
    ),
})

const createTemperatureSeries = (): LayerTimeSeries<TemperatureObservation> => {
    const baseTemps = [18.5, 21.2, 24.0, 26.8, 28.5, 27.9, 25.4, 22.8, 20.1]
    return {
        snapshots: TIME_POINTS.map((time, timeIdx) => ({
            time,
            data: TEMPERATURE_STATIONS.map((station, sIdx) => {
                const variation = ((sIdx * 7) % 5) * 0.6 - 1.2
                return {
                    ...station,
                    value: parseFloat((baseTemps[timeIdx] + variation).toFixed(1)),
                    unit: '°C',
                }
            }),
        })),
    }
}

const createWindSeries = (): LayerTimeSeries<WindObservation> => {
    const baseSpeeds = [3.2, 4.1, 5.5, 6.8, 7.4, 6.2, 5.0, 4.3, 3.5]
    return {
        snapshots: TIME_POINTS.map((time, timeIdx) => ({
            time,
            data: WIND_STATIONS.map((station, sIdx) => {
                const speedOffset = ((sIdx * 4) % 6) * 0.5 - 1.0
                const direction = (140 + sIdx * 35 + timeIdx * 12) % 360
                return {
                    ...station,
                    speed: parseFloat(Math.max(1, baseSpeeds[timeIdx] + speedOffset).toFixed(1)),
                    direction,
                    unit: 'м/с',
                }
            }),
        })),
    }
}

const createInsolationSeries = (): LayerTimeSeries<InsolationObservation> => {
    const baseInsolation = [420, 580, 750, 890, 940, 860, 680, 450, 210]
    return {
        snapshots: TIME_POINTS.map((time, timeIdx) => ({
            time,
            data: INSOLATION_STATIONS.map((station, sIdx) => {
                const variation = ((sIdx * 13) % 9) * 15 - 60
                return {
                    ...station,
                    value: Math.max(0, Math.round(baseInsolation[timeIdx] + variation)),
                    unit: 'Вт/м²',
                }
            }),
        })),
    }
}

export const fetchTemperatureData = async (): Promise<LayerTimeSeries<TemperatureObservation>> => {
    await delay(350)
    return createTemperatureSeries()
}

export const fetchWindData = async (): Promise<LayerTimeSeries<WindObservation>> => {
    await delay(350)
    return createWindSeries()
}

export const fetchInsolationData = async (): Promise<LayerTimeSeries<InsolationObservation>> => {
    await delay(350)
    return createInsolationSeries()
}

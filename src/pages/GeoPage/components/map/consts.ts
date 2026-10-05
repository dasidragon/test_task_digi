import type { Map, Popup } from 'maplibre-gl'
import * as maplibregl from 'maplibre-gl'
import { MAP_LAYERS, MAP_SOURCES } from '@/consts.ts'

export const addPopupHandler = (map: Map, layerId: string, generateHtml: (properties: Record<string, string | number>) => string) => {
    map.on('click', layerId, event => {
        const feature = event.features?.[0]
        if (!feature || !feature.properties) {
            return
        }
        const props = feature.properties as Record<string, string | number>
        const popup: Popup = new maplibregl.Popup({ closeButton: true, maxWidth: '240px' })
        popup.setLngLat(event.lngLat).setHTML(generateHtml(props)).addTo(map)
    })

    map.on('mouseenter', layerId, () => {
        map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', layerId, () => {
        map.getCanvas().style.cursor = ''
    })
}

export const initTemperatureLayers = (map: Map) => {
    map.addSource(MAP_SOURCES.TEMPERATURE, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
    })

    map.addLayer({
        id: MAP_LAYERS.TEMPERATURE_HEAT,
        type: 'heatmap',
        source: MAP_SOURCES.TEMPERATURE,
        maxzoom: 15,
        paint: {
            'heatmap-weight': ['interpolate', ['linear'], ['get', 'value'], 15, 0, 35, 1],
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 2.5],
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(0,0,0,0)',
                0.2,
                '#91caff',
                0.4,
                '#69b1ff',
                0.6,
                '#ffd591',
                0.8,
                '#ff7a45',
                1,
                '#f5222d',
            ],
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 15, 15, 45],
            'heatmap-opacity': 0.65,
        },
    })

    map.addLayer({
        id: MAP_LAYERS.TEMPERATURE_CIRCLE,
        type: 'circle',
        source: MAP_SOURCES.TEMPERATURE,
        minzoom: 10,
        paint: {
            'circle-radius': 11,
            'circle-color': ['interpolate', ['linear'], ['get', 'value'], 15, '#1677ff', 22, '#fa8c16', 28, '#f5222d'],
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.9,
        },
    })

    map.addLayer({
        id: MAP_LAYERS.TEMPERATURE_LABEL,
        type: 'symbol',
        source: MAP_SOURCES.TEMPERATURE,
        minzoom: 11,
        layout: {
            'text-field': ['concat', ['to-string', ['get', 'value']], '°C'],
            'text-size': 11,
            'text-offset': [0, 1.6],
        },
        paint: {
            'text-color': '#1f1f1f',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
        },
    })

    addPopupHandler(
        map,
        MAP_LAYERS.TEMPERATURE_CIRCLE,
        props => `
    <div style="font-family: system-ui, sans-serif; padding: 2px;">
      <div style="font-size: 14px; font-weight: 700; color: #fa541c;">🌡️ ${props.name ?? 'Станция'}</div>
      <div style="font-size: 12px; color: #8c8c8c; margin-top: 2px;">${props.district ?? 'Бишкек'}</div>
      <div style="font-size: 20px; font-weight: 800; color: #1f1f1f; margin-top: 6px;">${props.value} °C</div>
      <div style="font-size: 11px; color: #595959; margin-top: 4px;">Слой: Температура воздуха</div>
    </div>
  `,
    )
}

export const initWindLayers = (map: Map) => {
    map.addSource(MAP_SOURCES.WIND, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
    })

    map.addLayer({
        id: MAP_LAYERS.WIND_CIRCLE,
        type: 'circle',
        source: MAP_SOURCES.WIND,
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['get', 'speed'], 0, 7, 10, 20],
            'circle-color': ['interpolate', ['linear'], ['get', 'speed'], 0, '#b5f5ec', 5, '#13c2c2', 10, '#006d75'],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.85,
        },
    })

    map.addLayer({
        id: MAP_LAYERS.WIND_LABEL,
        type: 'symbol',
        source: MAP_SOURCES.WIND,
        minzoom: 10.5,
        layout: {
            'text-field': ['concat', ['to-string', ['get', 'speed']], ' м/с'],
            'text-size': 11,
            'text-offset': [0, 1.6],
        },
        paint: {
            'text-color': '#006d75',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
        },
    })

    addPopupHandler(
        map,
        MAP_LAYERS.WIND_CIRCLE,
        props => `
    <div style="font-family: system-ui, sans-serif; padding: 2px;">
      <div style="font-size: 14px; font-weight: 700; color: #13c2c2;">💨 ${props.name ?? 'Станция'}</div>
      <div style="font-size: 12px; color: #8c8c8c; margin-top: 2px;">${props.district ?? 'Бишкек'}</div>
      <div style="font-size: 20px; font-weight: 800; color: #1f1f1f; margin-top: 6px;">${props.speed} м/с</div>
      <div style="font-size: 11px; color: #595959; margin-top: 4px;">Направление ветра: ${props.direction}°</div>
    </div>
  `,
    )
}

export const initInsolationLayers = (map: Map) => {
    map.addSource(MAP_SOURCES.INSOLATION, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
    })

    map.addLayer({
        id: MAP_LAYERS.INSOLATION_HEAT,
        type: 'heatmap',
        source: MAP_SOURCES.INSOLATION,
        maxzoom: 15,
        paint: {
            'heatmap-weight': ['interpolate', ['linear'], ['get', 'value'], 0, 0, 1000, 1],
            'heatmap-intensity': 1.6,
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(0,0,0,0)',
                0.2,
                '#fffb8f',
                0.5,
                '#ffd666',
                0.8,
                '#fa8c16',
                1,
                '#d4380d',
            ],
            'heatmap-radius': 32,
            'heatmap-opacity': 0.6,
        },
    })

    map.addLayer({
        id: MAP_LAYERS.INSOLATION_CIRCLE,
        type: 'circle',
        source: MAP_SOURCES.INSOLATION,
        minzoom: 10,
        paint: {
            'circle-radius': 11,
            'circle-color': ['interpolate', ['linear'], ['get', 'value'], 0, '#fffb8f', 500, '#ffd666', 800, '#fa8c16', 1000, '#d4380d'],
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.9,
        },
    })

    addPopupHandler(
        map,
        MAP_LAYERS.INSOLATION_CIRCLE,
        props => `
    <div style="font-family: system-ui, sans-serif; padding: 2px;">
      <div style="font-size: 14px; font-weight: 700; color: #d48806;">☀️ ${props.name ?? 'Станция'}</div>
      <div style="font-size: 12px; color: #8c8c8c; margin-top: 2px;">${props.district ?? 'Бишкек'}</div>
      <div style="font-size: 20px; font-weight: 800; color: #1f1f1f; margin-top: 6px;">${props.value} Вт/м²</div>
      <div style="font-size: 11px; color: #595959; margin-top: 4px;">Слой: Инсоляция</div>
    </div>
  `,
    )
}

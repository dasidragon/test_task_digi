export const BISHKEK_COORDINATES: [number, number] = [74.5698, 42.8746]

export const MAP_STYLE_URL = import.meta.env.VITE_MAP_STYLE_URL

export const MAP_SOURCES = {
    TEMPERATURE: 'temperature-source',
    WIND: 'wind-source',
    INSOLATION: 'insolation-source',
} as const

export const MAP_LAYERS = {
    TEMPERATURE_HEAT: 'temperature-heatmap-layer',
    TEMPERATURE_CIRCLE: 'temperature-circle-layer',
    TEMPERATURE_LABEL: 'temperature-label-layer',
    WIND_CIRCLE: 'wind-circle-layer',
    WIND_LABEL: 'wind-label-layer',
    INSOLATION_HEAT: 'insolation-heatmap-layer',
    INSOLATION_CIRCLE: 'insolation-circle-layer',
} as const

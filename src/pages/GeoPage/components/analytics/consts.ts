import type { TooltipValue } from '@/pages/GeoPage/components/analytics/index.tsx'

export const AXIS_TICK_STYLE = { fill: 'rgba(0, 0, 0, 0.45)', fontSize: 10 }

export const formatTemperature = (val: TooltipValue | undefined): [string, string] => [
    `${Array.isArray(val) ? val.join(', ') : (val ?? 0)} °C`,
    'Средняя',
]

export const formatWind = (val: TooltipValue | undefined): [string, string] => [
    `${Array.isArray(val) ? val.join(', ') : (val ?? 0)} м/с`,
    'Ветер',
]

export const formatInsolation = (val: TooltipValue | undefined): [string, string] => [
    `${Array.isArray(val) ? val.join(', ') : (val ?? 0)} Вт/м²`,
    'Инсоляция',
]

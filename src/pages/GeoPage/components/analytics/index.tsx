import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { Badge, Card, Empty, Space, Switch, Tag, Typography } from 'antd'
import { setSelectedTimeIndex, toggleLayerVisibility, useDispatch, useSelector } from '@/store/map-store.ts'
import { useChartData } from './useChartData.ts'
import type { ChartClickPayload } from '@/api/geo/GeoModel.ts'
import { AXIS_TICK_STYLE, formatInsolation, formatTemperature, formatWind } from './consts.ts'
import { AnalyticsScroll, ChartContainer } from './styled.ts'

const { Text } = Typography

export type TooltipValue = number | string | ReadonlyArray<number | string>

export interface AnalyticsProps {
    className?: string
}

export const Analytics = ({ className }: AnalyticsProps) => {
    const dispatch = useDispatch()
    const timePoints = useSelector(s => s.timePoints)
    const selectedIndex = useSelector(s => s.selectedTimeIndex)
    const layers = useSelector(s => s.layers)
    const tempData = useSelector(s => s.temperatureData)
    const windData = useSelector(s => s.windData)
    const insolationData = useSelector(s => s.insolationData)

    const chartData = useChartData({
        timePoints,
        tempData,
        windData,
        insolationData,
    })

    const selectedTime = timePoints[selectedIndex]

    const handlePointClick = (data: ChartClickPayload | null | undefined) => {
        if (!data || data.activeLabel === undefined || data.activeLabel === null) {
            return
        }
        const labelString = String(data.activeLabel)
        const targetIdx = timePoints.indexOf(labelString)
        if (targetIdx >= 0) {
            setSelectedTimeIndex(dispatch, targetIdx)
        }
    }

    return (
        <AnalyticsScroll vertical gap='small' className={className}>
            <Card
                size='small'
                title={
                    <Space size='small'>
                        <Badge color={layers.temperature.color} />
                        <Text strong>Температура воздуха</Text>
                        <Tag color='orange'>°C</Tag>
                    </Space>
                }
                extra={
                    <Switch
                        checked={layers.temperature.visible}
                        onChange={() => toggleLayerVisibility(dispatch, 'temperature')}
                        size='small'
                    />
                }
            >
                {layers.temperature.visible ? (
                    <ChartContainer>
                        <ResponsiveContainer width='100%' height='100%'>
                            <LineChart data={chartData} onClick={handlePointClick} cursor='pointer'>
                                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                                <XAxis dataKey='time' tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} />
                                <YAxis tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} width={30} />
                                <Tooltip formatter={formatTemperature} />
                                <ReferenceLine x={selectedTime} stroke='#1677ff' strokeDasharray='3 2' />
                                <Line
                                    type='monotone'
                                    dataKey='temperature'
                                    stroke={layers.temperature.color}
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: layers.temperature.color }}
                                    activeDot={{
                                        r: 5,
                                        fill: '#ffffff',
                                        stroke: layers.temperature.color,
                                        strokeWidth: 2,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Слой выключен' />
                )}
            </Card>

            <Card
                size='small'
                title={
                    <Space size='small'>
                        <Badge color={layers.wind.color} />
                        <Text strong>Скорость ветра</Text>
                        <Tag color='cyan'>м/с</Tag>
                    </Space>
                }
                extra={<Switch checked={layers.wind.visible} onChange={() => toggleLayerVisibility(dispatch, 'wind')} size='small' />}
            >
                {layers.wind.visible ? (
                    <ChartContainer>
                        <ResponsiveContainer width='100%' height='100%'>
                            <AreaChart data={chartData} onClick={handlePointClick} cursor='pointer'>
                                <defs>
                                    <linearGradient id='windFillGradient' x1='0' y1='0' x2='0' y2='1'>
                                        <stop offset='5%' stopColor={layers.wind.color} stopOpacity={0.4} />
                                        <stop offset='95%' stopColor={layers.wind.color} stopOpacity={0.0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                                <XAxis dataKey='time' tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} />
                                <YAxis tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} width={30} />
                                <Tooltip formatter={formatWind} />
                                <ReferenceLine x={selectedTime} stroke='#1677ff' strokeDasharray='3 2' />
                                <Area
                                    type='monotone'
                                    dataKey='wind'
                                    stroke={layers.wind.color}
                                    strokeWidth={2}
                                    fill='url(#windFillGradient)'
                                    dot={{ r: 3, fill: layers.wind.color }}
                                    activeDot={{ r: 5, fill: '#ffffff', stroke: layers.wind.color, strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Слой выключен' />
                )}
            </Card>

            <Card
                size='small'
                title={
                    <Space size='small'>
                        <Badge color={layers.insolation.color} />
                        <Text strong>Инсоляция</Text>
                        <Tag color='gold'>Вт/м²</Tag>
                    </Space>
                }
                extra={
                    <Switch
                        checked={layers.insolation.visible}
                        onChange={() => toggleLayerVisibility(dispatch, 'insolation')}
                        size='small'
                    />
                }
            >
                {layers.insolation.visible ? (
                    <ChartContainer>
                        <ResponsiveContainer width='100%' height='100%'>
                            <BarChart data={chartData} onClick={handlePointClick} cursor='pointer'>
                                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                                <XAxis dataKey='time' tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} />
                                <YAxis tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} width={36} />
                                <Tooltip formatter={formatInsolation} />
                                <ReferenceLine x={selectedTime} stroke='#1677ff' strokeDasharray='3 2' />
                                <Bar dataKey='insolation' fill={layers.insolation.color} opacity={0.85} radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Слой выключен' />
                )}
            </Card>
        </AnalyticsScroll>
    )
}

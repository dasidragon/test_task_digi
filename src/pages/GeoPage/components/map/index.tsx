import { type FC, useRef } from 'react'
import { Spin, Alert, Typography } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import { useSelector } from '@/store/map-store.ts'
import { useMapboxMap } from './useMapboxMap.ts'
import { useMapboxLayersSync } from './useMapboxLayersSync.ts'
import { MapCityTag, MapContainer, MapOverlayLoading } from './styled.ts'

export const Map: FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const selectedTimeIndex = useSelector(s => s.selectedTimeIndex)
    const layers = useSelector(s => s.layers)
    const tempData = useSelector(s => s.temperatureData)
    const windData = useSelector(s => s.windData)
    const insolationData = useSelector(s => s.insolationData)

    const { mapInstance, isMapLoaded, mapError } = useMapboxMap(containerRef)

    useMapboxLayersSync({
        map: mapInstance,
        isMapLoaded,
        selectedTimeIndex,
        layers,
        temperatureData: tempData,
        windData,
        insolationData,
    })

    return (
        <MapContainer>
            <div ref={containerRef} id='mapbox-map-canvas' style={{ width: '100%', height: '100%' }} />

            <MapCityTag size='small'>
                <EnvironmentOutlined />
                <Typography.Text strong>Бишкек, Кыргызстан</Typography.Text>
            </MapCityTag>

            {!isMapLoaded && !mapError && (
                <MapOverlayLoading vertical align='center' justify='center' gap='small'>
                    <Spin size='large' />
                </MapOverlayLoading>
            )}

            {mapError && (
                <MapOverlayLoading vertical align='center' justify='center'>
                    <Alert title='Ошибка загрузки карты' description={mapError} type='error' showIcon />
                </MapOverlayLoading>
            )}
        </MapContainer>
    )
}

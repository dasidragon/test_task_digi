import styled from '@emotion/styled'
import { Flex, Layout, Space } from 'antd'

export const MapContainer = styled(Layout)`
    width: 100%;
    height: 100%;
    position: relative;
    background: transparent;
`

export const MapOverlayLoading = styled(Flex)`
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
    z-index: 10;
`

export const MapCityTag = styled(Space)`
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 5;
    background: rgba(255, 255, 255, 0.9);
    padding: 6px 12px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

import { Layout, Space, Spin, Tag, Typography } from 'antd'
import { useSelector } from '@/store/map-store.ts'
import { useLayerLoader } from '@/hooks/useLayerLoader'
import { Map } from './components/map'
import { Timeline } from './components/timeline'
import { Analytics } from './components/analytics'
import { StyledLayoutRoot, StyledHeader, StyledContentFlex, StyledMapPane, StyledSidebar, StyledFooter } from './styled'

export const GeoPage = () => {
    useLayerLoader()
    const globalLoading = useSelector(s => s.globalLoading)

    return (
        <StyledLayoutRoot>
            <StyledHeader>
                <Space size='middle'>
                    <Typography.Title level={4}>Тестовое задание</Typography.Title>
                </Space>

                <Space size='middle'>
                    {globalLoading && (
                        <Tag icon={<Spin size='small' />} color='processing'>
                            Загрузка слоев...
                        </Tag>
                    )}
                </Space>
            </StyledHeader>

            <Layout.Content>
                <StyledContentFlex gap={12}>
                    <StyledMapPane>
                        <Map />
                    </StyledMapPane>

                    <StyledSidebar vertical gap={12}>
                        <Analytics />
                    </StyledSidebar>
                </StyledContentFlex>
            </Layout.Content>

            <StyledFooter>
                <Timeline />
            </StyledFooter>
        </StyledLayoutRoot>
    )
}

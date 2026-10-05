import { GeoPage } from '@/pages/GeoPage'
import { ConfigProvider } from 'antd'
import { MapStoreProvider } from '@/store/map-store.ts'

const App = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1677ff',
                    borderRadius: 6,
                },
            }}
        >
            <MapStoreProvider>
                <GeoPage />
            </MapStoreProvider>
        </ConfigProvider>
    )
}

export default App

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    base: '/test_task_digi',
    define: {
        'process.env': {},
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        },
    },
    server: {
        port: 3000,
        open: true,
        host: true,
    },
    optimizeDeps: {
        exclude: ['maplibre-gl'],
    },
    build: {
        rollupOptions: {
            output: {
                assetFileNames: assetInfo => {
                    if (assetInfo.name === 'maplibre-gl-worker.mjs') {
                        return 'assets/maplibre-gl-worker.mjs'
                    }

                    if (assetInfo.name === 'maplibre-gl-shared.mjs') {
                        return 'assets/maplibre-gl-shared.mjs'
                    }

                    return 'assets/[name]-[hash][extname]'
                },
            },
        },
    },
})

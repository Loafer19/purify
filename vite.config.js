import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'

function generateManifest() {
    const manifest = readJsonFile('src/manifest.json')
    const pkg = readJsonFile('package.json')

    return {
        description: pkg.description,
        version: pkg.version,
        ...manifest,
    }
}

export default defineConfig(({ mode }) => {
    Object.assign(process.env, loadEnv(mode, process.cwd()))

    return {
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        plugins: [
            vue(),
            webExtension({
                manifest: generateManifest,
                webExtConfig: {
                    startUrl: process.env.VITE_START_URL,
                },
            }),
        ],
    }
})

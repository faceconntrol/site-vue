import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const skipTypeCheck = process.env.DISABLE_TYPE_CHECK === 'true'
  const skipImageOptimize = process.env.DISABLE_IMAGE_OPTIMIZE === 'true'
  
  const imageOptimizerPlugin = skipImageOptimize ? [] : [
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|webp)$/i,
      exclude: undefined,
      include: undefined,
      includePublic: true,
      logStats: true,
      ansiColors: true,
      skipOptimize: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false,
              },
            },
          },
        ],
      },
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
    })
  ]
  
  return {
    plugins: [
      vue({
        script: {
          // Отключаем проверку типов при сборке, если установлен флаг
          defineModel: true,
          propsDestructure: true,
          babelParserPlugins: skipTypeCheck ? ['typescript'] : []
        }
      }),
      vuetify({ autoImport: true }),
      ...imageOptimizerPlugin,
      mode === 'production' && visualizer({
        filename: './stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url))
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@styles/_variables" as *;`
        }
      }
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],
    publicDir: 'public',
    base: './',
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['vue', 'vuetify', 'vue-router', 'pinia'],
            'ui': ['@mdi/font']
          }
        },
      },
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
    },
    server: {
      hmr: {
        timeout: 120000
      }
    },
    optimizeDeps: {
      exclude: process.env.VITE_IGNORE_PARENT_PACKAGE_JSON ? ['**/package.json'] : []
    }
  }
})

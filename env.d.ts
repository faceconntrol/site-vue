/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vuetify/lib/framework' {
  import type { Framework } from 'vuetify'
  const framework: Framework
  export default framework
}

declare module 'vuetify/iconsets/mdi' {
  import type { IconSet } from 'vuetify'
  export const mdi: IconSet
  export const aliases: Record<string, string>
}

declare module '@mdi/font/css/materialdesignicons.css'
declare module 'vuetify/styles' 
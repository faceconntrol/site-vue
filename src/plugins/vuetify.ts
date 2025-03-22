import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import './preload-vuetify'

// Определяем, является ли устройство мобильным по User Agent или ширине экрана
const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
  const isMobileWidth = window.innerWidth <= 768;
  return isMobileUA || isMobileWidth;
};

// Адаптируем тему на основе устройства
const getTheme = () => {
  const isPhone = isMobileDevice();
  return {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#000000',
          secondary: '#333333',
          accent: '#666666',
          background: '#FFFFFF',
          surface: '#FFFFFF',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        },
        variables: {
          'border-radius': isPhone ? '10px' : '4px',
        },
      }
    }
  };
};

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: getTheme(),
  defaults: {
    VBtn: {
      variant: 'flat',
      height: 44,
      rounded: 'lg',
      density: isMobileDevice() ? 'comfortable' : 'default',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable'
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable'
    },
    VCard: {
      elevation: 2,
      rounded: 'lg'
    },
    VDialog: {
      scrollable: true,
      persistent: false
    }
  }
}) 
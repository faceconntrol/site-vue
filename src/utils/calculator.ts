import { NETWORK_EQUIPMENT } from '@/constants'
import type { CalculatorConfig, CalculatorResult, Product } from '@/types/store'

export class SecurityCalculator {
  private products: Record<string, Product>

  constructor(products: Record<string, Product>) {
    this.products = products
  }

  public calculateTotal(config: CalculatorConfig): CalculatorResult {
    const selectedCamera = config.selectedCamera ? this.products[config.selectedCamera.id] : null
    const selectedNvr = config.selectedNvr ? this.products[config.selectedNvr.id] : null

    if (!selectedCamera) {
      throw new Error('Камера не выбрана')
    }

    // Расчет стоимости оборудования
    const cameraPrice = selectedCamera.price
    const camerasTotal = cameraPrice * config.cameraCount
    const nvrPrice = config.useNvr && selectedNvr ? selectedNvr.price : 0

    // Расчет стоимости монтажных работ
    const mountingBox = config.cameraCount * 700      // 700₽ за монтажную коробку
    const cameraInstall = config.cameraCount * 1500   // 1500₽ за установку камеры
    const cameraSetup = config.cameraCount * 400      // 400₽ за настройку камеры
    const commissioning = config.cameraCount * 500    // 500₽ за пуско-наладку
    const nvrInstall = config.useNvr ? 2000 : 0      // 2000₽ за установку регистратора

    // Общая стоимость
    const total = camerasTotal + nvrPrice + 
                 mountingBox + cameraInstall + 
                 cameraSetup + commissioning + 
                 nvrInstall

    return {
      total,
      breakdown: {
        cameras: camerasTotal,
        storage: nvrPrice,
        installation: {
          mountingBox,
          cameraInstall,
          cameraSetup,
          commissioning,
          nvrInstall
        }
      },
      equipment: {
        cameras: [{
          name: selectedCamera.title,
          price: cameraPrice,
          count: config.cameraCount
        }],
        storage: config.useNvr && selectedNvr ? {
          type: 'nvr',
          name: selectedNvr.title,
          price: nvrPrice
        } : undefined
      }
    }
  }
} 
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'
import sharp from 'sharp'

async function optimizeImages(directory) {
  const files = await readdir(directory)
  
  for (const file of files) {
    const filePath = join(directory, file)
    const fileStat = await stat(filePath)
    
    if (fileStat.isDirectory()) {
      await optimizeImages(filePath)
      continue
    }
    
    const ext = extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue
    }
    
    console.log(`Оптимизация ${filePath}...`)
    
    try {
      // Создание WebP версии
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(filePath.replace(ext, '.webp'))
      
      // Оптимизация оригинала
      await sharp(filePath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(filePath.replace(ext, '.optimized' + ext))
      
      // Создание уменьшенных версий для разных размеров экрана
      const sizes = [320, 640, 1280]
      
      for (const width of sizes) {
        await sharp(filePath)
          .resize(width)
          .webp({ quality: 75 })
          .toFile(filePath.replace(ext, `-${width}.webp`))
      }
    } catch (error) {
      console.error(`Ошибка при оптимизации ${filePath}:`, error)
    }
  }
}

// Запуск для директории с изображениями продуктов
optimizeImages('./public/images/products')
  .then(() => console.log('Оптимизация изображений завершена'))
  .catch(err => console.error('Ошибка оптимизации изображений:', err)) 
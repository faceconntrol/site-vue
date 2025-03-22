export interface Product {
  id: string;
  title: string;
  description?: string;
  section?: string;
  category?: string;
  brand?: string;
  specs?: string[];
  price?: number;
  image?: string;
  [key: string]: any; // Для других свойств
}

export function extractResolution(product: Product | string[]): number | null {
  if (!product) return null;
  
  // Получаем спецификации из продукта или используем переданный массив
  const specs = Array.isArray(product) ? product : product.specs || [];
  
  // Отладочная информация
  if (!Array.isArray(product) && specs.length > 0) {
    console.log(`[DEBUG] extractResolution: Проверка спецификаций для ${product.title}`);
    console.log(`[DEBUG] extractResolution: Спецификации:`, specs);
  }
  
  // Если это объект продукта, проверяем название и описание
  if (!Array.isArray(product)) {
    // Преобразуем название в нижний регистр для поиска
    const title = product.title ? product.title.toLowerCase() : '';
    
    // Попробуем найти разрешение в названии (многие камеры имеют 2MP, 4MP и т.д. в названии)
    const titleMatch = title.match(/(\d+)(?:\s*|-){0,1}(?:мп|mp|мегапиксел)/i);
    if (titleMatch) {
      const resolution = parseInt(titleMatch[1], 10);
      console.log(`[DEBUG] extractResolution: Найдено разрешение в названии: ${resolution} Мп`);
      return resolution;
    }
    
    // Проверяем описание продукта - обычно разрешение указывается в начале
    const description = product.description ? product.description.toLowerCase() : '';
    const descMatch = description.match(/^(\d+)\s*(?:мп|mp|мегапиксел)/i);
    if (descMatch) {
      const resolution = parseInt(descMatch[1], 10);
      console.log(`[DEBUG] extractResolution: Найдено разрешение в описании: ${resolution} Мп`);
      return resolution;
    }
    
    // Поиск в описании в любом месте
    const fullDescMatch = description.match(/(\d+)\s*(?:мп|mp|мегапиксел)/i);
    if (fullDescMatch) {
      const resolution = parseInt(fullDescMatch[1], 10);
      console.log(`[DEBUG] extractResolution: Найдено разрешение в полном описании: ${resolution} Мп`);
      return resolution;
    }
  }
  
  // Ищем в спецификациях
  for (const spec of specs) {
    if (typeof spec !== 'string') continue;
    
    // Прямой поиск строки "Разрешение X Мп"
    const resolutionMatch = spec.match(/разрешение\s+(\d+)\s*(?:мп|mp|мегапиксел)/i);
    if (resolutionMatch) {
      const resolution = parseInt(resolutionMatch[1], 10);
      console.log(`[DEBUG] extractResolution: Найдено прямое разрешение: ${resolution} Мп`);
      return resolution;
    }
    
    // Проверяем начало с "Разрешение", с учетом возможной кириллицы
    if (spec.toLowerCase().includes('разрешение')) {
      // Более общий паттерн для поиска чисел перед "Мп"
      const match = spec.match(/(\d+)\s*(?:мп|mp|мегапиксел|мп\s*\()/i);
      if (match) {
        const resolution = parseInt(match[1], 10);
        console.log(`[DEBUG] extractResolution: Найдено разрешение в спецификации: ${resolution} Мп`);
        return resolution;
      }
    }
    
    // Проверяем, начинается ли строка с числа и "МП"
    const startMatch = spec.match(/^(\d+)\s*(?:мп|mp|мегапиксел)/i);
    if (startMatch) {
      const resolution = parseInt(startMatch[1], 10);
      console.log(`[DEBUG] extractResolution: Найдено разрешение в начале спецификации: ${resolution} Мп`);
      return resolution;
    }
  }
  
  // Если ничего не найдено, проверяем название еще раз, более гибко
  if (!Array.isArray(product) && product.title) {
    const titleMatches = product.title.match(/(\d+)(?:\s*|-|\s+)(?:мп|mp|мегапиксел|megapixel)/i) || 
                         product.title.match(/(\d+)(?:\s*|-|\s+)(?:м|m)/i);
    if (titleMatches) {
      const resolution = parseInt(titleMatches[1], 10);
      console.log(`[DEBUG] extractResolution: Найдено разрешение в расширенном поиске названия: ${resolution} Мп`);
      return resolution;
    }
  }
  
  console.log(`[DEBUG] extractResolution: Разрешение не найдено для продукта ${!Array.isArray(product) ? product.title : 'массив спецификаций'}`);
  return null;
}

export function getAvailableResolutions(products: Product[]): number[] {
  const resolutions = new Set<number>();
  
  products.forEach(product => {
    const resolution = extractResolution(product);
    if (resolution) {
      resolutions.add(resolution);
    }
  });
    
  return Array.from(resolutions).sort((a, b) => a - b);
}

/**
 * Проверяет, является ли значение названием секции
 */
export function isSection(value: string): boolean {
  if (!value) return false;
  return value === 'video' || value === 'smart-home';
} 
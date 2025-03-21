export function extractResolution(specs: string[]): number | null {
  for (const spec of specs) {
    // Ищем строки содержащие "МП" или "MP"
    const match = spec.match(/(\d+)(?:\s*(?:МП|MP|Мп|Mp))/i)
    if (match) {
      return parseInt(match[1])
    }
  }
  return null
}

export function getAvailableResolutions(products: Product[]): number[] {
  const resolutions = new Set<number>()
  
  products
    .filter(product => product.category === 'camera')
    .forEach(product => {
      const resolution = extractResolution(product.specs)
      if (resolution) {
        resolutions.add(resolution)
      }
    })
    
  return Array.from(resolutions).sort((a, b) => a - b)
} 
// Улучшенное определение iOS устройств
export function detectMobilePlatform() {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Более точная проверка для iOS
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
  const isAndroid = /android/i.test(userAgent);
  const isMobile = isIOS || isAndroid || /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
  
  console.log('User Agent:', userAgent);
  console.log('Detected:', { isMobile, isIOS, isAndroid });
  
  // Добавляем соответствующий класс к body
  if (isMobile) {
    document.body.classList.add('mobile-device');
    
    if (isIOS) {
      document.body.classList.add('ios-device');
      console.log('iOS device detected, added class');
    } else if (isAndroid) {
      document.body.classList.add('android-device');
    } else {
      document.body.classList.add('other-mobile-device');
    }
  }
  
  return {
    isMobile,
    isIOS,
    isAndroid
  };
}

// Хук для использования в компонентах
export function useMobileDetector() {
  return detectMobilePlatform();
} 
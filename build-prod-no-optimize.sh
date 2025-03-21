#!/bin/bash
# Сборка без оптимизации изображений

echo "Запуск сборки без оптимизации изображений..."
export DISABLE_TYPE_CHECK=true
export DISABLE_IMAGE_OPTIMIZE=true
vite build

if [ $? -eq 0 ]; then
  echo "Сборка успешно завершена!"
  echo "Проверьте результат с помощью npm run preview"
else
  echo "Произошла ошибка при сборке."
  exit 1
fi 
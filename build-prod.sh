#!/bin/bash
# Скрипт для производственной сборки

# Проверка типов с производственной конфигурацией
echo "Проверка типов с производственными настройками..."
npm run prod-check

# Если проверка прошла успешно, выполняем сборку
if [ $? -eq 0 ]; then
  echo "Сборка проекта..."
  npm run build
  echo "Сборка завершена! Проверьте результат с помощью npm run preview"
else
  echo "Ошибка при проверке типов. Сборка не выполнена."
  exit 1
fi 
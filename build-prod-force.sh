#!/bin/bash
# Скрипт для производственной сборки в обход проверки типов

echo "Запуск сборки в обход проверки типов..."
export DISABLE_TYPE_CHECK=true
npm run lint && vite build

if [ $? -eq 0 ]; then
  echo "Сборка успешно завершена!"
  echo "Проверьте результат с помощью npm run preview"
else
  echo "Произошла ошибка при сборке."
  exit 1
fi 
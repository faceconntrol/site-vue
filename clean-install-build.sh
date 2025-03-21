#!/bin/bash
# Скрипт для чистой установки и сборки проекта

echo "Удаление node_modules..."
rm -rf node_modules

echo "Удаление package-lock.json..."
rm -f package-lock.json

echo "Установка зависимостей..."
npm install

echo "Установка terser..."
npm install terser --save-dev

echo "Запуск сборки..."
npm run build-force

if [ $? -eq 0 ]; then
  echo "Проект успешно собран!"
else
  echo "Ошибка при сборке. Попробуйте запустить сборку без оптимизации изображений:"
  echo "npm run build-safe"
fi 
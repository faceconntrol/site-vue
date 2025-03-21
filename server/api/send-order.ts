import type { IncomingMessage, ServerResponse } from 'http'
import nodemailer from 'nodemailer'

// Создаем транспорт для отправки почты
const transporter = nodemailer.createTransport({
  service: 'Yandex',
  auth: {
    user: 'your-email@yandex.ru',
    pass: process.env.YANDEX_MAIL_PASSWORD
  }
})

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // Включаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Обрабатываем preflight запросы
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.writeHead(405)
    res.end('Method Not Allowed')
    return
  }

  try {
    // Получаем данные из тела запроса
    const chunks: Buffer[] = []
    for await (const chunk of req) {
      chunks.push(chunk)
    }
    const data = JSON.parse(Buffer.concat(chunks).toString())

    // Формируем текст письма
    const mailText = `
      Новый заказ:
      
      Контактные данные:
      Телефон: ${data.phone}
      Email: ${data.email}
      
      Конфигурация системы:
      Количество камер: ${data.config.cameraCount}
      Модель камеры: ${data.config.cameraModel}
      ${data.config.nvrModel ? `Видеорегистратор: ${data.config.nvrModel}` : ''}
      ${data.config.useCloud ? `Облачное хранение: Да (${data.config.cloudStorageMonthly} ₽/мес)` : ''}
      
      Стоимость:
      Камеры: ${data.calculation.breakdown.cameras} ₽
      Хранение: ${data.calculation.breakdown.storage} ₽
      Монтаж: ${data.calculation.breakdown.installation} ₽
      
      Итого: ${data.calculation.total} ₽
    `

    // Отправляем письмо
    await transporter.sendMail({
      from: 'your-email@yandex.ru',
      to: 'manager@third-eye.ru',
      subject: 'Новый заказ с сайта',
      text: mailText
    })

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true }))
  } catch (error) {
    console.error('Ошибка при обработке заказа:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ 
      success: false, 
      message: 'Произошла ошибка при обработке заказа' 
    }))
  }
} 
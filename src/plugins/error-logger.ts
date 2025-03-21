type ErrorLevel = 'info' | 'warning' | 'error' | 'critical'

interface LogEvent {
  message: string
  level: ErrorLevel
  context?: Record<string, any>
  timestamp: number
}

class ErrorLogger {
  private logs: LogEvent[] = []
  private readonly maxLogs = 100

  log(message: string, level: ErrorLevel = 'info', context?: Record<string, any>) {
    const event: LogEvent = {
      message,
      level,
      context,
      timestamp: Date.now()
    }
    
    this.logs.unshift(event)
    
    if (this.logs.length > this.maxLogs) {
      this.logs.pop()
    }
    
    if (level === 'error' || level === 'critical') {
      console.error(message, context)
      this.sendToServer(event)
    }
  }
  
  private sendToServer(event: LogEvent) {
    // В production можно отправлять на сервер
    if (import.meta.env.PROD) {
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(() => {
        // Тихий провал - не хотим создавать бесконечную рекурсию при ошибках логирования
      })
    }
  }
  
  getRecentLogs(count = 10) {
    return this.logs.slice(0, count)
  }
}

export const errorLogger = new ErrorLogger()

// Интеграция с глобальной обработкой ошибок Vue
export function setupErrorLogging(app: any) {
  app.config.errorHandler = (err: any, instance: any, info: string) => {
    errorLogger.log(
      err.message || 'Неизвестная ошибка в компоненте', 
      'error',
      { 
        stack: err.stack,
        component: instance?.$options?.name || 'Unknown', 
        info,
        additionalData: err.additionalData
      }
    )
  }
} 
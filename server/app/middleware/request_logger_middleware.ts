import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RequestLoggerMiddleware {
  async handle({ logger, request, auth }: HttpContext, next: NextFn) {
    logger.info(`${request.method()} - ${request.url(true)} (${auth.user?.username ?? 'no-auth'})`)
    return next()
  }
}

import { DashboardService } from '#services/dashboard_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

interface DashboardResponse {}

@inject()
export default class DashboardController {
  constructor(private service: DashboardService) {}

  async get({ request, response }: HttpContext) {
    return service.get()
  }
}

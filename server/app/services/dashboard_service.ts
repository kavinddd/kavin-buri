import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'

interface GetResp {
  adr: number
  occupancy: number
  revPar: number
  totalArrival: number
  totalInHouse: number
  totalDeparture: number
  totalAdult: number
  totalChildren: number
}

@inject()
export class DashboardService {
  constructor(private logger: Logger) {}
  async get(): Promise<GetResp> {
    return {}
  }
}

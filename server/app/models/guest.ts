import { DateTime } from 'luxon'
import { BaseModel, column, dateColumn } from '@adonisjs/lucid/orm'

export default class Guest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare citizenId: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare nationality: string

  @column.date()
  declare dateOfBirth: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

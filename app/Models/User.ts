import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { Hash } from '@adonisjs/core/build/standalone' // TODO: import this
import Logger from '@ioc:Adonis/Core/Logger'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      try {
        user.password = await Hash.use('bcrypt').make(user.password)
      } catch (err) {
        Logger.error(err)
      }
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

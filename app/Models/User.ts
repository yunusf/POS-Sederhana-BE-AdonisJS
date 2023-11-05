import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash' // TODO: import untuk encoding password
import Logger from '@ioc:Adonis/Core/Logger'
import Profile from './Profile'

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

  // melakukan Encoding terhadap inputan password menggunakan hash
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      try {
        user.password = await Hash.make(user.password)
      } catch (err) {
        Logger.error(err)
      }
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // menghubungkan relasi dengan product melalui model product
  @hasOne(() => Profile, {
    foreignKey: 'user_id',
  })
  public profile: HasOne<typeof Profile>
}

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
// import Transaction from 'App/Models/Transaction'
import Product from './Product'
import Transaction from './Transaction'

export default class TransactionDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public qty: number

  @column()
  public subtotal: number

  // foreign key product
  @column()
  public product_id: number

  // foreign key transaction
  @column()
  public transaction_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // menghubungkan relasai dari pivot table

  // table product
  @belongsTo(() => Product, {
    foreignKey: 'product_id',
  })
  public product: BelongsTo<typeof Product>

  // table transaction
  @belongsTo(() => Transaction, {
    foreignKey: 'transaction_id',
  })
  public transaction: BelongsTo<typeof Transaction>
}

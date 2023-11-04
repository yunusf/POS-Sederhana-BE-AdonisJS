import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Kategori from './Kategori'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public kode: string

  @column()
  public nama: string

  @column()
  public brand: string

  @column()
  public harga_beli: number

  @column()
  public harga_jual: number

  @column()
  public diskon: number

  @column()
  public stok: number

  @column()
  public satuan: string

  // foreign key kategori
  // @column({ columnName: 'kategori_id' }) // mengambil kolom kategori_id
  // public kategoriId: number // membuat properti kategoriId sebagai kolom kategori_id
  @column()
  public kategori_id

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // menghubungkan relasi dengan kategori melalui model kategori
  @belongsTo(() => Kategori, {
    foreignKey: 'kategori_id',
  })
  public kategori: BelongsTo<typeof Kategori>
}

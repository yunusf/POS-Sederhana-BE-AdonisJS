import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('kode').unique().notNullable()
      table.string('nama').unique().notNullable()
      table.string('brand')
      table.integer('harga_beli')
      table.integer('harga_jual')
      table.integer('diskon')
      table.integer('stok').notNullable()
      table.string('satuan').notNullable()

      // Relationship
      table.integer('kategori_id').unsigned().references('kategorises.id').onDelete('CASCADE') // delete post when user is deleted

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.timestamps(true, true)
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

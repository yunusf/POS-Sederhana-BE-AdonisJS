import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_details'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('qty')
      table.integer('subtotal')

      // foreign key dari relasi tabel products
      table.integer('product_id').unsigned().references('products.id')
      // foreign key dari relasi tabel transactions
      table.integer('transaction_id').unsigned().references('transactions.id')

      table.unique(['product_id', 'transaction_id'])

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

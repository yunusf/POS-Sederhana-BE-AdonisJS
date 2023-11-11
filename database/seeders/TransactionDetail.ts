import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TransactionDetail from 'App/Models/TransactionDetail'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    // Write your database queries inside the run method
    await TransactionDetail.createMany([
      {
        qty: 2,
        subtotal: 10000,
        product_id: 1,
        transaction_id: 1,
      },
      {
        qty: 1,
        subtotal: 5000,
        product_id: 1,
        transaction_id: 2,
      },
      {
        qty: 3,
        subtotal: 15000,
        product_id: 1,
        transaction_id: 3,
      },
    ])
  }
}

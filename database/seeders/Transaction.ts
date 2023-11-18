import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Transaction from 'App/Models/Transaction'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    // Write your database queries inside the run method
    await Transaction.createMany([
      {
        total_item: 2,
        total_harga: 10000,
        bayar: 15000,
        diterima: 5000,
        user_id: 17,
      },
      {
        total_item: 1,
        total_harga: 5000,
        bayar: 15000,
        diterima: 10000,
        user_id: 17,
      },
      {
        total_item: 3,
        total_harga: 15000,
        bayar: 15000,
        diterima: 0,
        user_id: 17,
      },
    ])
  }
}

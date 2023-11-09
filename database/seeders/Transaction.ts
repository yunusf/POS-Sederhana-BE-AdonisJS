import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Transaction from 'App/Models/Transaction'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    // Write your database queries inside the run method
    await Transaction.createMany([
      {
        total_item: 4,
        total_harga: 235000,
        bayar: 240000,
        diterima: 5000,
        user_id: 17,
      },
      {
        total_item: 4,
        total_harga: 235000,
        bayar: 240000,
        diterima: 5000,
        user_id: 19,
      },
      {
        total_item: 2,
        total_harga: 5000,
        bayar: 5000,
        diterima: 0,
        user_id: 17,
      },
    ])
  }
}

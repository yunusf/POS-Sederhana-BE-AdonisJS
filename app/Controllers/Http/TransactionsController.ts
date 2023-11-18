import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import CreateTransactionValidator from 'App/Validators/CreateTransactionValidator'

export default class TransactionsController {
  public async store({ request, response }: HttpContextContract) {
    // try {
    const validationPayload = await request.validate(CreateTransactionValidator)
    const vp = validationPayload

    // jika pembayaran kurang dari total harga
    if (vp.bayar < vp.total_harga) {
      return response.ok({
        message: {
          'Total Harga': vp.total_harga,
          'Bayar': vp.bayar,
          'Kekurangan': vp.total_harga - vp.bayar,
        },
      })
    }

    vp.diterima = vp.bayar - vp.total_harga

    const add = await Transaction.create(vp)

    return response.ok({
      message: 'Data Created',
      add,
    })
    // } catch (error) {
    //   return response.badRequest({
    //     message: 'gagal',
    //     error,
    //   })
    // }
  }

  public async index({ response }: HttpContextContract) {
    const data = await Transaction.all()

    return response.ok({
      message: 'Data Success',
      data,
    })
  }

  public async show({ response, params }: HttpContextContract) {
    const data = await Transaction.query().where('id', params.id).preload('user').first()

    if (!data) {
      return response.notFound({
        message: `Data Dengan id: ${params.id} Tidak Ditemukan`,
      })
    }

    return response.ok({
      message: 'Data Berhasil Ditampilkan',
      data,
    })
  }

  //   public async update({ request, response, params }: HttpContextContract) {}

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const data = await Transaction.findOrFail(params.id)

      await data.delete()

      return response.ok({
        message: `Data Dengan id: ${params.id} Berhasil Dihapus`,
      })
    } catch (error) {
      return response.notFound({
        message: `Data Dengan id: ${params.id} Tidak Ditemukan`,
        error,
      })
    }
  }
}

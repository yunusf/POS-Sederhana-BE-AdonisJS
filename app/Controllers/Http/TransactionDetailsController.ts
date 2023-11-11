import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransactionDetail from 'App/Models/TransactionDetail'
import CreateTransactionDetailValidator from 'App/Validators/CreateTransactionDetailValidator'

export default class TransactionDetailsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const validationPayload = await request.validate(CreateTransactionDetailValidator)

      const add = await TransactionDetail.create(validationPayload)

      return response.ok({
        message: 'Data Created',
        add,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Create Failed',
        error,
      })
    }
  }

  public async index({ response }: HttpContextContract) {
    const data = await TransactionDetail.all()

    return response.ok({
      message: 'Data Duccess',
      data,
    })
  }

  public async show({ response, params }: HttpContextContract) {
    const data = await TransactionDetail.query()
      .where('id', params.id)
      .preload('product')
      .preload('transaction')
      .first()

    console.log(data)
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

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const data = await TransactionDetail.findOrFail(params.id)

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

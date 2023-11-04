import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'

export default class ProductsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const validationPayload = await request.validate(CreateProductValidator)

      const addProduct = await Product.create(validationPayload)

      return response.ok({
        message: 'Data Created',
        data: addProduct,
      })
    } catch (err) {
      return response.badRequest({
        message: 'Create Failed',
        error: err,
      })
    }
  }

  public async index({ response }: HttpContextContract) {
    const dataProducts = await Product.query().preload('kategori')

    return response.ok({
      message: 'Data Success',
      data: dataProducts,
    })
  }

  public async show({ response, params }: HttpContextContract) {
    const dataProduct = await Product.query().where('id', params.id).preload('kategori').first()

    if (!dataProduct) {
      return response.notFound({
        message: `Data Dengan id: ${params.id} Tidak Ditemukan`,
      })
    }

    return response.ok({
      message: `Data Berhasil Ditampilkan`,
      data: dataProduct,
    })
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const id = params.id

      const validationPayload = await request.validate(UpdateProductValidator)

      const product = await Product.findOrFail(id)

      product.harga_beli = validationPayload.harga_beli
      product.harga_jual = validationPayload.harga_jual
      product.diskon = validationPayload.diskon
      product.stok = validationPayload.stok
      product.satuan = validationPayload.satuan
      product.kategori_id = validationPayload.kategori_id

      await product.save()

      const updateProduct = await Product.query().where('id', id).preload('kategori').first()

      if (!updateProduct) {
        return response.notFound({
          message: `Data gagal update`,
        })
      }

      return response.ok({
        message: `Data ${product.nama} Berhasil Update`,
        data: updateProduct,
      })
    } catch (error) {
      return response.notFound({
        message: `Data dengan id ${params.id} tidak ditemukan`,
        error,
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const product = await Product.findOrFail(params.id)

      await product.delete()

      return response.ok({
        message: `Data Dengan id: ${params.id} Berhasil Dihapus`,
      })
    } catch (error) {
      return response.notFound({
        message: `Data Dengan id: ${params.id} Tidak Ditemukan`,
      })
    }
  }
}

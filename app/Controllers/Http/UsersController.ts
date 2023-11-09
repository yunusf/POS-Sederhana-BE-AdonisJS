import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    try {
      // membuat var baru menampung data request yg sudah di validasi oleh var CreateUserValidator
      const validationPayload = await request.validate(CreateUserValidator)

      // menambahkan data baru menggunakan model User berdasarkan data var validationPayload
      const addUser = await User.create(validationPayload)

      return response.created({
        message: 'Data Created',
        data: addUser,
      })
    } catch (err) {
      return response.badRequest({
        message: 'Create Failed',
        error: err,
      })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      // membuat var baru berisi query select all dari table user
      // const dataUsers = await User.all()
      const dataUsers = await User.query()
        .orderBy('id', 'desc')
        .preload('profile')
        .preload('transaksi')

      return response.ok({
        messege: 'Data Berhasil Ditampilkan',
        data: dataUsers,
      })
    } catch (err) {
      return response.badRequest({
        message: 'Data Gagal Ditampilkan',
        error: err,
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      // query select berdasar id dari table user
      await User.findByOrFail('id', params.id)
      const data = await User.query().where('id', params.id).preload('profile').preload('transaksi')

      return response.ok({
        message: 'Data Berhasil Ditampilkan',
        data,
      })
    } catch (err) {
      return response.notFound({
        message: `Data Dengan id: ${params.id} Tidak Ditemukan`,
        error: err,
      })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const id = params.id // mengambil params id

      // membuat aturan validasi untuk request
      const validation = schema.create({
        password: schema.string([
          rules.alphaNum({
            allow: ['underscore'],
          }),
          rules.minLength(6),
          rules.maxLength(14),
          rules.trim(),
        ]),
        role: schema.enum(['user', 'admin']),
      })

      // membuat var baru berisi validasi dari request dengan skema dari var validate
      const validationPayload = await request.validate({ schema: validation })

      const findById = await User.query().where('id', id).first()
      if (!findById) {
        return response.notFound({
          message: `Data Dengan id: ${id} Tidak Ditemukan`,
        })
      }

      const update = await User.query().where('id', id).update(validationPayload)

      if (!update) {
        return response.badRequest({
          message: `Data gagal update`,
        })
      }

      // menampilkan data user yang sudah di update berdasarkan id
      const show = await User.query()
        .where('id', id)
        .preload('profile')
        .preload('transaksi')
        .first()

      return response.ok({
        message: `Data Dengan id: ${id} Berhasil Update`,
        data: show,
      })
    } catch (error) {
      return response.badRequest({
        message: `Data gagal update`,
        error,
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    // membuat var baru berisi query delete berdasar id dari table user
    try {
      const deleteUser = await User.findOrFail(params.id)
      deleteUser.delete()

      return response.ok({
        message: `Data Dengan id: ${params.id} Berhasil Dihapus`,
      })
    } catch (err) {
      return response.notFound({
        message: `Data Dengan id ${params.id} Tidak Ditemukan`,
        error: err,
      })
    }
  }
}

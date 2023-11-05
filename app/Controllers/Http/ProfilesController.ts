import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const validation = schema.create({
        alamat: schema.string([rules.trim(), rules.minLength(10)]),
        bio: schema.string.nullable([rules.trim(), rules.minLength(10)]),
        no_hp: schema.string([rules.trim(), rules.minLength(11), rules.maxLength(14)]),
      })

      const validationPayload = await request.validate({ schema: validation })

      const add = await Profile.create(validationPayload)

      return response.created({
        message: 'Data Created',
        data: add,
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
      const data = await Profile.query().preload('user')

      return response.ok({
        message: 'Data Success',
        data: data,
      })
    } catch (err) {
      return response.badRequest({
        message: 'Data Fail',
        error: err,
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const data = await Profile.query().where('id', params.id).preload('user').first()

    if (!data) {
      return response.notFound({
        message: `Data Dengan id: ${params.id} Tidak Ditemukan`,
      })
    }

    return response.ok({
      message: 'Data Berhasil Ditampilkan',
      data: data,
    })
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const id = params.id

      const validation = schema.create({
        alamat: schema.string([rules.trim(), rules.minLength(10)]),
        bio: schema.string([rules.trim(), rules.minLength(10)]),
        no_hp: schema.string([rules.trim(), rules.minLength(11), rules.maxLength(14)]),
      })
      // membuat var baru berisi validasi dari request dengan skema dari var validate
      const validationPayload = await request.validate({ schema: validation })

      const findById = await Profile.query().where('id', id).first()
      if (!findById) {
        return response.notFound({
          message: `Data Dengan id: ${id} Tidak Ditemukan`,
        })
      }

      const update = await Profile.query().where('id', id).update(validationPayload)

      if (!update) {
        return response.badRequest({
          message: `Data gagal update`,
        })
      }

      // menampilkan data Profile yang sudah di update berdasarkan id
      const show = await Profile.query().where('id', id).preload('user').first()

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
    try {
      const deleteProfil = await Profile.findOrFail(params.id)

      deleteProfil.delete()

      return response.ok({
        message: `Data Dengan id: ${params.id} Berhasil Dihapus`,
      })
    } catch (err) {
      return response.notFound({
        message: `Data Dengan id: ${params.id} Tidak Ditemukan`,
        error: err,
      })
    }
  }
}

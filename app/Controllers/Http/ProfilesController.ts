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

      const addProfile = await Profile.create(validationPayload)

      return response.created({
        message: 'Data Created',
        data: addProfile,
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
      const dataProfiles = await Profile.query()

      return response.ok({
        message: 'Data Success',
        data: dataProfiles,
      })
    } catch (err) {
      return response.badRequest({
        message: 'Data Fail',
        error: err,
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const dataProfil = await Profile.findByOrFail('id', params.id)

      return response.ok({
        message: 'Data Berhasil Ditampilkan',
        data: dataProfil,
      })
    } catch (err) {
      return response.notFound({
        message: `Data Dengan id: ${params.id} Tidak Ditemukan`,
        error: err,
      })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const idProfil = params.id

    const validation = schema.create({
      alamat: schema.string([rules.trim(), rules.minLength(10)]),
      bio: schema.string([rules.trim(), rules.minLength(10)]),
      no_hp: schema.string([rules.trim(), rules.minLength(11), rules.maxLength(14)]),
    })

    const validationPayload = await request.validate({ schema: validation })

    const updateProfil = await Profile.findOrFail(idProfil) // findorfail tdk bisa di tangkap oleh !updateProfile

    updateProfil.alamat = validationPayload.alamat
    updateProfil.bio = validationPayload.bio
    updateProfil.no_hp = validationPayload.no_hp

    await updateProfil.save()

    const showProfil = await Profile.find(idProfil)

    // TODO: tidak bisa di gunakan bersama findOrFail()
    // if (!updateProfil) {
    //   return response.notFound({
    //     message: `Data Dengan id: ${idProfil} Tidak Ditemukan`,
    //   })
    // }

    // if (!showProfil) {
    //   return response.badRequest({
    //     message: `Data Dengan id: ${idProfil} Gagal Update`,
    //     data: showProfil,
    //   })
    // }

    return response.ok({
      message: `Data Dengan id: ${idProfil} Berhasil Update`,
      data: showProfil,
    })
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

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class KategorisController {
  public async store({ request, response }: HttpContextContract) {
    try {
      // dataValidation digunakan untuk memvalidasi inputan agar sesuai dngn ketentuan yg di terapkan
      const dataValidation = schema.create({
        nama: schema.string([
          rules.alpha({
            allow: ['space'],
          }),
          rules.trim(),
          rules.unique({
            table: 'kategorises',
            column: 'nama',
          }),
        ]),
      })

      // membuat var baru berisi data yang sudah di cek dengan validate
      const validationPayload = await request.validate({ schema: dataValidation })

      // insert data kedalam database
      await Database.insertQuery().table('kategorises').insert(validationPayload)

      return response.created({
        message: 'data berhasil ditambahkan',
        data: validationPayload,
      })
    } catch (err) {
      return response.badRequest({
        message: 'data gagal ditambahkan',
        // err: err.messages.errors,
        err,
      })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      // membuat var yg menampilkan semua data table kategorises
      const dataKategori = await Database.from('kategorises').select('*')

      return response.ok({
        message: 'kumpulan data berhasil di dapat',
        data: dataKategori,
      })
    } catch (err) {
      return response.badRequest({
        message: 'data gagal di dapat',
        err,
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const id = params.id // mengambil id dari url api

    // menampilkan data berdasarkan id
    const dataKategori = await Database.from('kategorises').where('id', id).first()

    if (!dataKategori) {
      return response.notFound({
        message: `id '${id}' tidak ditemukan`,
      })
    }
    return response.ok({
      message: 'detail data berhasil di dapat',
      data: dataKategori,
    })
  }

  public async update({ request, response, params }: HttpContextContract) {
    // dataValidation digunakan untuk memvalidasi inputan agar sesuai dngn ketentuan yg di terapkan
    const dataValidation = schema.create({
      nama: schema.string([
        rules.alpha({
          allow: ['space'],
        }),
        rules.trim(),
        rules.unique({
          table: 'kategorises',
          column: 'nama',
        }),
      ]),
    })

    // membuat var baru berisi data yang sudah di cek dengan validate
    const validationPayload = await request.validate({ schema: dataValidation })

    // melakukan update data berdasarkan id
    const dataKategori = await Database.from('kategorises')
      .where('id', params.id)
      .update(validationPayload)

    // mencari data berdasarkan id
    const detailKategori = await Database.from('kategorises').where('id', params.id).first()

    // jika data berdasar id tidak ada, maka mengembalikan notFound
    if (!detailKategori) {
      return response.notFound({
        message: `data dengan id '${params.id}' tidak ditemukan`,
      })
    }

    // jika dataKategori false / request validate gagal, maka mengembalikan data gagal update
    if (!dataKategori) {
      return response.badRequest({
        message: `data dengan id '${params.id}' gagal di update`,
      })
    }

    return response.ok({
      message: 'update success',
      data: detailKategori,
    })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const id = params.id // mengambil id dari url api

    // membuat var baru dengan query menghapus data berdasarkan id dari table kategorises
    const destroyKategori = await Database.from('kategorises').where('id', id).delete()

    if (!destroyKategori) {
      return response.notFound({
        message: `data dengan id '${id}' tidak ditemukan`,
      })
    }

    return response.ok({
      message: 'delete success',
    })
  }
}

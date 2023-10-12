/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
                data : addUser,
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
            // membuat var baru berisi query select berdasar id dari table user
            const dataUser = await User.findByOrFail('id', params.id)

            return response.ok({
                message: 'Data Berhasil Ditampilkan',
                data: dataUser,
            })
        } catch (err) {
            return response.notFound({
                message: `Data Dengan id: ${params.id} Tidak Ditemukan`,
                error: err,
            })
        }
    }

    // public async update({ request, response, params }: HttpContextContract) {
    //     const idUser = params.id

    //     const validationPayload = await request.validate(CreateUserValidator)

    //     const updateUser = await User.findOrFail(idUser)

    //     updateUser.nama = validationPayload.nama
    //     updateUser.email = validationPayload.email
    //     updateUser.password = validationPayload.password
    //     updateUser.role = validationPayload.role
        
    //     await updateUser.save()
        

    //     // const updateUser = await User
    //     //     .query()
    //     //     .where('id', idUser)
    //     //     .update(validationPayload)
        
    //     const showUser = await User
    //         .query()
    //         .where('id', idUser)
    //         .first()
        
    //     // if (!updateUser) {
    //     //     return response.notFound({
    //     //         message: `Data Dengan id: ${idUser} Tidak Ditemukan`,
    //     //     })
    //     // }

    //     // if (!showUser) {
    //     //     return response.badRequest({
    //     //         message: `Data Dengan id: ${idUser} Gagal Update`,
    //     //         data: showUser
    //     //     })
    //     // }
        
    //     return response.ok({
    //         message: `Data Dengan id: ${idUser} Berhasil Update`,
    //         data: showUser,
    //     })
    // }

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
                error: err
            })
        }    
    }
}

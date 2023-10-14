import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Profile from 'App/Models/Profile'

export default class ProfilesController {

    public async store({ request, response }: HttpContextContract) {
        try {
            const validation = schema.create({
                alamat: schema.string([
                    rules.trim(),
                    rules.minLength(10),
                ]),
                bio: schema.string.nullable([
                    rules.trim(),
                    rules.minLength(10),    
                ]),
                no_hp: schema.string([
                    rules.trim(),
                    rules.minLength(11),
                    rules.maxLength(14),
                ]),
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

}

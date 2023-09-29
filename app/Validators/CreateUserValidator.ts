import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */

  // TODO: membuat pengecekan terhadap request sesuai ketentuan
  public schema = schema.create({
    nama: schema.string([
      rules.alpha({
        allow: ['space'],
      }),
      rules.minLength(4),
      rules.trim(),
    ]),

    email: schema.string([
      rules.email({
        ignoreMaxLength: true,
      }),
    ]),

    password: schema.string([
      rules.alphaNum({
        allow: ['underscore'],
      }),
      rules.minLength(6),
      rules.maxLength(14),
      rules.trim(),
    ]),

    role: schema.enum(['admin', 'user']),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}

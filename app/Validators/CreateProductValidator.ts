import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductValidator {
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
  public schema = schema.create({
    kode: schema.string([
      rules.alphaNum({
        allow: ['space'],
      }),
      rules.minLength(4),
      rules.trim(),
      rules.unique({
        table: 'products',
        column: 'kode',
      }),
    ]),

    nama: schema.string([
      rules.alpha({
        allow: ['space'],
      }),
      rules.minLength(4),
      rules.trim(),
      rules.unique({
        table: 'products',
        column: 'nama',
      }),
    ]),

    brand: schema.string([
      rules.alphaNum({
        allow: ['space', 'underscore', 'dash'],
      }),
      rules.minLength(2),
      rules.trim(),
    ]),

    harga_beli: schema.number.nullable(),
    harga_jual: schema.number(),
    diskon: schema.number.nullable(),
    stok: schema.number(),
    satuan: schema.string([rules.alpha(), rules.trim()]),
    kategori_id: schema.number([
      rules.exists({
        table: 'kategorises',
        column: 'id',
      }),
    ]),
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

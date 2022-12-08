// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
export default class AuthController {
  public async index({ request, response }: HttpContextContract) {
    const validations = schema.create({
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' })
      ]),
      password: schema.string({}, [
        rules.confirmed()
      ])
    })

    const data = await request.validate({ schema: validations })

    const newUser = await User.create(data)
    return response.created(newUser)
  }
}

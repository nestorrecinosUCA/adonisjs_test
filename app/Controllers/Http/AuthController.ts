// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export default class AuthController {
  public async register({ request, response }: HttpContextContract): Promise<void> {
    const validations = schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
    })

    const data = await request.validate({ schema: validations })

    const newUser = await User.create(data)
    return response.created(newUser)
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.unauthorized({
        message: 'Invalid credentials',
        status: 401,
      })
    }
  }
}

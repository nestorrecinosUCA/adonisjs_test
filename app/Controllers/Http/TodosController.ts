import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({ request }: HttpContextContract): Promise<Todo[]> {
    const page = request.input('page', 1)
    const limit = request.input('per_page', 10)
    return await Todo.query().preload('user').paginate(page, limit)
  }

  public async store({ request, response, auth }: HttpContextContract): Promise<void> {
    const userId: number = auth.user?.$original.id
    const newTodo = await Todo.create({
      title: request.input('title'),
      is_completed: false,
      user_id: userId,
    })

    return response.created(newTodo)
  }

  public async update({ request, response, params }: HttpContextContract): Promise<void> {
    const todoToUpdate = await Todo.findOrFail(params.id)
    todoToUpdate.is_completed = request.input('is_completed')
    todoToUpdate.save()
    return response.status(200).send(todoToUpdate)
  }
}

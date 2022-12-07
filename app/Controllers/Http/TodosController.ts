import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index(): Promise<Todo[]> {
    return Todo.all()
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const newTodo = await Todo.create({
      title: request.input('title'),
      is_completed: false,
    })
    return response.status(201).send(newTodo)
  }
}

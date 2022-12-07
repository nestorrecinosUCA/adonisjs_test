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

  public async update({ request, response, params }: HttpContextContract): Promise<void> {
    const todoToUpdate = await Todo.findOrFail(params.id)
    todoToUpdate.is_completed = request.input('is_completed')
    todoToUpdate.save()
    return response.status(204).send(todoToUpdate)
  }
}

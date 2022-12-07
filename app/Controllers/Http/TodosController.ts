import { Response } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

export default class TodosController {
  public async index(): Promise<Todo[]> {
    return Todo.all();
  }

  public async store({ request, response }: HttpContextContract) {
    const newTodo = Todo.create({
      title: request.input('title'),
      is_completed: false,
    });

    return response.status(201).json(newTodo);
  }
}

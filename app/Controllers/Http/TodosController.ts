// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

export default class TodosController {
  public async index(): Promise<Todo[]> {
    return Todo.all();
  }
}

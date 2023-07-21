import { Injectable } from '@angular/core';
import { ITodo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: ITodo[] = [];
  // private _todos: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  // todos$ = this._todos.asObservable();

  constructor() {
  }

  // getTodoList(): ITodo[] {
  //   return this._todos.getValue();
  // }
  //
  // setTodoList(value: ITodo[]): void {
  //   this._todos.next(value);
  // }

  addTodo(todoTitle: string): void {
    // line 26 works too
    if (todoTitle) {
      this.todos.push({
        text: todoTitle,
        id: this.todos.length,
        done: false
      });
    }
  }

  getTodos(): ITodo[] {
    console.log('getTodos()', this.todos);
    return this.todos;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((value: ITodo) => value.id !== id);
  }

  // we said dont pass only boolean, its useless u dont know anything from it
  markAsDone(id: number): void {
    //this makes no sense
    // its returning array or booleans [true, false, false etc...]
    // it works bcs u are not assigning new todo mapped array it just stays nowhere
    //if u did |this.todos = this.todos.map((value: ITodo) => value.done === done);| app would break;
    this.todos = this.todos.map((value: ITodo) => {
      if (value.id === id) {
        value.done = true;
      }
      return value;
    });
    // check some map examples and properly assign 'done' property to only one element u select!
  }

}

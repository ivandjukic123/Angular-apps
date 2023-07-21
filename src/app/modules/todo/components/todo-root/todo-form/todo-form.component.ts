import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoTitle = '';

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.todoService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }
}

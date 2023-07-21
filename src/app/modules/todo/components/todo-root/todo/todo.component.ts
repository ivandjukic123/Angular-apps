import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { ITodo } from '../../../interfaces/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo: any;

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  onDelete(todo: ITodo): void {
    this.todoService.deleteTodo(todo.id);
  }

  markTodoAsDone(todo: ITodo): void {
    this.todoService.markAsDone(todo.id);
  }
}

import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-root',
  templateUrl: './todo-root.component.html',
  styleUrls: ['./todo-root.component.scss']
})
export class TodoRootComponent implements OnInit {

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
  }

}

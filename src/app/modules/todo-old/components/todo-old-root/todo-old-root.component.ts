import { Component, OnInit } from '@angular/core';
import { TodoOldInterface } from '../../interfaces/todo-old.interface';

@Component({
  selector: 'app-todo-old-root',
  templateUrl: './todo-old-root.component.html',
  styleUrls: ['./todo-old-root.component.scss']
})
export class TodoOldRootComponent implements OnInit {
  todos: TodoOldInterface[] = [
    {
      id: this.generateRandomId(),
      content: 'Clean house',
      priority: 'MAJOR'
    },
    {
      id: this.generateRandomId(),
      content: 'Buy bread',
      priority: 'MINOR'
    },
    {
      id: this.generateRandomId(),
      content: 'Wash dishes',
      priority: 'TRIVIAL'
    }
  ];
  formModel = {
    todoName: '',
    priority: '',
    filterBy: ''
  };
  radioOptions = [
    { id: 1, displayText: 'Major', value: 'MAJOR' },
    { id: 2, displayText: 'Minor', value: 'MINOR' },
    { id: 3, displayText: 'Trivial', value: 'TRIVIAL' }
  ];
  selectOptions = [
    { id: 0, displayText: 'Filter by..', value: '' },
    { id: 1, displayText: 'Major', value: 'MAJOR' },
    { id: 2, displayText: 'Minor', value: 'MINOR' },
    { id: 3, displayText: 'Trivial', value: 'TRIVIAL' }
  ];
  users: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelectModelChange() {
    console.log('trigger');
  }

  change(): void {
    console.log('on select model change');
  }

  generateRandomId(): string {
    return Math.random().toString(36);
  }

  onTodoFormSubmit() {
    if (this.formModel.todoName && this.formModel.priority) {
      this.todos.push({
        priority: this.formModel.priority,
        id: this.generateRandomId(),
        content: this.formModel.todoName
      });
      this.resetForm();
    } else {
      console.log('Fill todo name and priority!');
    }
    console.log(this.todos);
  }

  resetForm(): void {
    this.formModel = {
      todoName: '',
      priority: '',
      filterBy: ''
    };
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}

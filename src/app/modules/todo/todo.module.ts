import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { TodoFormComponent } from './components/todo-root/todo-form/todo-form.component';
import { TodoRootComponent } from './components/todo-root/todo-root.component';
import { TodoComponent } from './components/todo-root/todo/todo.component';
import { TodoRoutingModule } from './todo-routing.module';


@NgModule({
  declarations: [
    TodoFormComponent,
    TodoRootComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TodoRoutingModule
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule {
}

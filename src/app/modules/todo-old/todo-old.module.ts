import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoOldRoutingModule } from './todo-old-routing.module';
import { TodoOldRootComponent } from './components/todo-old-root/todo-old-root.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoOldRootComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TodoOldRoutingModule
  ]
})
export class TodoOldModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoRootComponent } from './components/todo-root/todo-root.component';

const routes: Routes = [
  {
    path: '',
    component: TodoRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}

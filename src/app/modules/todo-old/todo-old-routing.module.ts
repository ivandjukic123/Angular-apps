import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoOldRootComponent } from './components/todo-old-root/todo-old-root.component';

const routes: Routes = [
  {
    path: '',
    component: TodoOldRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoOldRoutingModule {
}

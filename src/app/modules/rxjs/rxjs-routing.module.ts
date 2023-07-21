import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { RxjsTestSecondComponent } from './components/rxjs-test-second/rxjs-test-second.component';
import { RxjsTestThirdComponent } from './components/rxjs-test-third/rxjs-test-third.component';


const routes: Routes = [
  {
    path: '',
    component: RxjsComponent
  },
  {
    path: 'second',
    component: RxjsTestSecondComponent
  },
  {
    path: 'third',
    component: RxjsTestThirdComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule {}

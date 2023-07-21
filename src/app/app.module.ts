import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import { CoreModule } from './core/core.module';
import { DummyModule } from './modules/dummy/dummy.module';
import { TodoOldModule } from './modules/todo-old/todo-old.module';
import { ProductModule } from './modules/product/product.module';
import { FormModule } from './modules/reactive-form/form.module';
import { SellCarModule } from './modules/sell-car/sell-car.module';
import { BuyCarModule } from './modules/buy-car/buy-car.module';
import { UiFormModule } from './modules/ui-form/ui-form.module';
import { StepperFormModule } from './modules/stepper-form/stepper-form.module';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { RxjsModule } from './modules/rxjs/rxjs.module';
import { WeatherModule } from './modules/weather/weather.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
    TodoModule,
    UserModule,
    CoreModule,
    DummyModule,
    TodoOldModule,
    ProductModule,
    FormModule,
    SellCarModule,
    BuyCarModule,
    UiFormModule,
    StepperFormModule,
    ShoppingCartModule,
    RxjsModule,
    WeatherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

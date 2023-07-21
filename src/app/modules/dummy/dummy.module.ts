import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyRoutingModule } from './dummy-routing.module';
import { DummyRootComponent } from './components/dummy-root/dummy-root.component';
import { DummyPostComponent } from './components/dummy-post/dummy-post.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterByTagPipe } from './pipes/filter-by-tag.pipe';


@NgModule({
  declarations: [
    DummyRootComponent,
    DummyPostComponent,
    FilterPipe,
    FilterByTagPipe
  ],
  imports: [
    CommonModule,
    DummyRoutingModule,
    NgbTooltipModule,
    NgbDropdownModule
  ]
})
export class DummyModule {}

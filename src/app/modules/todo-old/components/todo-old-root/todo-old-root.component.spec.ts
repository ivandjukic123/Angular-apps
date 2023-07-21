import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoOldRootComponent } from './todo-old-root.component';

describe('TodoOldRootComponent', () => {
  let component: TodoOldRootComponent;
  let fixture: ComponentFixture<TodoOldRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoOldRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoOldRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

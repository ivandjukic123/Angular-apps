import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  todos: any[] = [];

  constructor(private coreService: CoreService) {
  }

  ngOnInit(): void {
    this.coreService.getTodos()
      .subscribe({
        next: value => {
          console.log(value);
          this.todos = value;
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log(new Date());
        }
      });
  }

}

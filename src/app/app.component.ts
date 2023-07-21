import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isMenuCollapsed: boolean = true;

  constructor() {
  }

  toggleNavbar(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  collapseNavbar(): void {
    this.isMenuCollapsed = true;
  }
}

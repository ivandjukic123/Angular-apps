import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-root',
  templateUrl: './form-root.component.html',
  styleUrls: ['./form-root.component.scss']
})
export class FormRootComponent implements OnInit {
  emailData: string = '';
  image = 'assets/images/blue.png';

  constructor() {
  }

  ngOnInit(): void {
  }

}

import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stepper-form-root',
  templateUrl: './stepper-form-root.component.html',
  styleUrls: ['./stepper-form-root.component.scss']
})
export class StepperFormRootComponent implements OnInit, AfterViewChecked {
  @ViewChild('passwordRef') passwordRef!: ElementRef;
  @ViewChild('countryRef') countryRef!: ElementRef;
  countryCollapsed = true;
  contentCollapsed = true;
  countries: string[] = ['Italy', 'China', 'France', 'Vatican'];
  formModel = {
    email: '',
    password: '',
    country: ''
  };
  params = {
    emailEdited: false,
    emailBlur: false,
    emailTouched: false,

    passwordEdited: false,
    passwordBlur: false,
    passwordTouched: false,

    countryEdited: false,
    countryBlur: false,
    countryTouched: false,
    toggleTouched: false
  };
  countryFieldOpen: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.formModel.country = this.countries[0];
  }

  ngAfterViewChecked(): void {
  }

  onInputEdit(email: boolean, password: boolean, country: boolean) {
    this.params.emailEdited = email;
    this.params.passwordEdited = password;
    this.params.countryEdited = country;
    this.contentCollapsed = true;

    if (email) {
      const emailCollapse = document.querySelector('.emailCollapse') as HTMLElement;
      emailCollapse.classList.remove('d-none');
      const spanVisibility = document.querySelector('.emailSpan') as HTMLElement;
      spanVisibility.classList.add('d-none');
    } else if (password) {
      const passCollapse = document.querySelector('.passCollapse') as HTMLElement;
      passCollapse.classList.remove('d-none');
      const spanVisibility = document.querySelector('.passSpan') as HTMLElement;
      spanVisibility.classList.add('d-none');
    }
  }

  onEmailFocus() {
    this.params.emailTouched = true;
    this.params.emailBlur = false;
    this.params.emailEdited = false;
    this.contentCollapsed = true;
  }

  onPasswordFocus() {
    this.params.passwordTouched = true;
    this.params.passwordEdited = false;
    this.params.passwordBlur = false;
    this.contentCollapsed = true;
  }

  onCountryFocus() {
    this.params.countryTouched = true;
    this.params.countryEdited = false;
    this.params.countryBlur = false;
    this.contentCollapsed = true;
  }

  onEmailBlur() {
    this.params.emailTouched = false;
    this.params.emailBlur = true;
    this.params.toggleTouched = false;
  }

  onPasswordBlur(form: any) {
    this.params.passwordTouched = false;
    this.params.passwordBlur = true;

    if (form.controls.password.valid) {
      this.countryCollapsed = false;
    }
  }

  onCountryBlur() {
    this.params.countryTouched = false;
    this.params.countryBlur = true;
    this.countryFieldOpen = false;
  }

  onEmailBtn(form: any) {
    if (form.controls.email.valid) {
      this.passwordRef.nativeElement.focus();
      const emailCollapse = document.querySelector('.emailCollapse') as HTMLElement;
      emailCollapse.classList.add('d-none');
      const spanVisibility = document.querySelector('.emailSpan') as HTMLElement;
      spanVisibility.classList.remove('d-none');
    } else {
      form.controls.email.markAsTouched();
    }
  }

  onPasswordBtn(form: any) {
    if (form.controls.password.valid) {
      this.countryCollapsed = false;
      const passCollapse = document.querySelector('.passCollapse') as HTMLElement;
      passCollapse.classList.add('d-none');
      const spanVisibility = document.querySelector('.passSpan') as HTMLElement;
      spanVisibility.classList.remove('d-none');
    } else {
      form.controls.password.markAsTouched();
    }
  }

  onTogglePressed() {
    this.params.toggleTouched = true;
  }

  onSelectedCountry() {
    this.contentCollapsed = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  loading: boolean = false;
  showInterestForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private formsService: FormsService) {
  }

  get name(): UntypedFormGroup {
    return this.showInterestForm.get('name') as UntypedFormGroup;
  }

  get email(): UntypedFormGroup {
    return this.showInterestForm.get('email') as UntypedFormGroup;
  }

  get acceptedGdprConsent(): UntypedFormGroup {
    return this.showInterestForm.get('acceptedGdprConsent') as UntypedFormGroup;
  }

  get isExchange(): UntypedFormGroup {
    return this.showInterestForm.get('isExchange') as UntypedFormGroup;
  }

  ngOnInit(): void {
    this.showInterestForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      exchangeMileage: null,
      isExchange: [false],
      exchangeRegNo: [],
      comment: [''],
      acceptedGdprConsent: [false, Validators.requiredTrue]
    });

    this.isExchange!.valueChanges.subscribe(value => {
      console.log(value, 'do stuff, add new validators etc...');
    });
  }

  onSubmit(): void {
    const body = {
      ...this.showInterestForm.value,
      carId: 2077,
      language: 'sv'
    };
    delete body.isExchange;

    // const body1 = Object.assign({}, this.interestForm.value, {
    //   carId: this.carDetailService.car.id,
    //   language: 'sv'
    // })

    console.log(body);
    this.showInterestForm.markAllAsTouched();

    if (this.showInterestForm.valid) {
      this.loading = true;
      this.formsService.sendShowInterestEmail(body)
        .subscribe(value => {
          console.log(value);
          this.loading = false;
          this.showInterestForm.reset();
        });
    }
  }

}

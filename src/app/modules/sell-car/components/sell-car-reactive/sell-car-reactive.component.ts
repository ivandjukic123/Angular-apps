import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SellCarService } from '../../services/sell-car.service';

@Component({
  selector: 'app-sell-car-reactive',
  templateUrl: './sell-car-reactive.component.html',
  styleUrls: ['./sell-car-reactive.component.scss']
})
export class SellCarReactiveComponent implements OnInit {
  sellCarForm!: UntypedFormGroup;
  loading: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder,
              private sellCarService: SellCarService) {
  }

  get regNo(): UntypedFormGroup {
    return this.sellCarForm.get('regNo') as UntypedFormGroup;
  }

  get mileage(): UntypedFormGroup {
    return this.sellCarForm.get('mileage') as UntypedFormGroup;
  }

  get email(): UntypedFormGroup {
    return this.sellCarForm.get('email') as UntypedFormGroup;
  }

  get acceptedGdprConsent(): UntypedFormGroup {
    return this.sellCarForm.get('acceptedGdprConsent') as UntypedFormGroup;
  }

  ngOnInit(): void {
    this.sellCarForm = this.formBuilder.group({
      regNo: ['', [Validators.required, Validators.pattern(/[A-Za-z]{3}[0-9]{2}[A-Za-z0-9]/g)]],
      mileage: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      acceptedGdprConsent: [true, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    const body = {
      ...this.sellCarForm.value,
      language: 'sv',
      sellStatus: 'SELL'
    };
    console.log(body);
    this.sellCarForm.markAllAsTouched();

    if (this.sellCarForm.valid) {
      this.loading = true;
      this.sellCarService.sellCarData(body)
        .subscribe(value => {
            this.loading = false;
            this.sellCarForm.reset();
            console.log(value);
            // check for success code, then do some notification for success
          }
        );
    }
  }
}

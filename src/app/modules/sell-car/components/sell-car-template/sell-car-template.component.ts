import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SellCarModel } from '../../models/sell-car.model';
import { SellCarService } from '../../services/sell-car.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sell-car-template',
  templateUrl: './sell-car-template.component.html',
  styleUrls: ['./sell-car-template.component.scss']
})
export class SellCarTemplateComponent implements OnInit {
  loading: boolean = false;
  model: SellCarModel = new SellCarModel();
  submitted = false;
  @ViewChild('phoneRef') phoneRef!: ElementRef;

  constructor(private sellCarService: SellCarService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    const body = {
      regNo: this.model.regNo,
      mileage: this.model.mileage,
      email: form.value.email,
      phone: this.phoneRef.nativeElement.value,
      language: this.model.language,
      sellStatus: this.model.sellStatus,
      acceptedGdprConsent: this.model.acceptedGdprConsent
    };
    console.log(form.value, this.model, body);
    if (form.valid) {
      this.loading = true;
      this.sellCarService.sellCarData(body)
        .subscribe(value => {
          this.loading = false;
          this.submitted = false;
          form.resetForm();
          console.log(value);
        });
    } else {
      console.log('form not valid for submission, notify user.');
    }
  }

}

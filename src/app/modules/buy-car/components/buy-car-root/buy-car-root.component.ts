import { Component, OnInit } from '@angular/core';
import { Car } from '../../interfaces/buy-car';
import { BuyCarService } from '../../services/buy-car.service';

@Component({
  selector: 'app-buy-car-root',
  templateUrl: './buy-car-root.component.html',
  styleUrls: ['./buy-car-root.component.scss']
})
export class BuyCarRootComponent implements OnInit {
  car!: Car;

  constructor(private buyCarService: BuyCarService) {
  }

  ngOnInit(): void {
    this.buyCarService.getCar()
      .subscribe((value: Car) => {
        this.car = value;
        console.log(this.car);
      });
  }
}

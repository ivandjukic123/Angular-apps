import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../interfaces/buy-car';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyCarService } from '../../services/buy-car.service';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buy-car',
  templateUrl: './buy-car.component.html',
  styleUrls: ['./buy-car.component.scss']
})
export class BuyCarComponent implements OnInit{
  @Input() car!: Car;
  carSlug: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private buyCarService: BuyCarService) {
  }

  ngOnInit(): void {
    const { cat } = this.route.snapshot.queryParams;
    this.buyCarService.getCar()
      .subscribe((value: Car) => {
        this.carSlug = value.similarCars[0].slug;
        value.similarCars.forEach((car: Car) => {
          if (cat === car.slug) {
            this.carSlug = car.slug;
          }
        });
        this.router.navigate(['/buy-car'], {
          queryParams: {
            cat: this.carSlug ? this.carSlug : null
          }
        });
      });
  }


  onNavChange(event: NgbNavChangeEvent):void {
    this.router.navigate(['/buy-car'], {
      queryParamsHandling: 'merge',
      queryParams: {
        cat: event.nextId,
      }
    });
  }
}

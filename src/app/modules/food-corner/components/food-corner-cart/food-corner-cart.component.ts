import { Component, OnInit } from '@angular/core';
import { FoodCornerService } from '../../services/food-corner.service';
import { Observable } from 'rxjs';
import { FoodCorner } from '../../interfaces/food-corner';

@Component({
  selector: 'app-food-corner-cart',
  templateUrl: './food-corner-cart.component.html',
  styleUrls: ['./food-corner-cart.component.scss']
})
export class FoodCornerCartComponent implements OnInit {
  noResponseImg: string = 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg';
  wishlistRecipes$!: Observable<FoodCorner[]>;
  wishlistData = this.foodCornerService.getWishlistItemsValue();

  constructor(public foodCornerService: FoodCornerService) {
  }

  ngOnInit(): void {
    const value = localStorage.getItem('foodInCart');
    if (value) {
      this.wishlistData = JSON.parse(value);
      this.foodCornerService.setWishlistItems(this.wishlistData);
    }

    this.wishlistRecipes$ = this.foodCornerService.wishlistRecipes$;
  }

  onDelete(value: any): void {
    const index = this.foodCornerService.getWishlistItemsValue().findIndex(item => {
      return item.id === value.id;
    });
    this.foodCornerService.getWishlistItemsValue().splice(index, 1);
    console.log(this.foodCornerService.getWishlistItemsValue());
    localStorage.setItem('foodInCart', JSON.stringify(this.foodCornerService.getWishlistItemsValue()));
  }

  toMainPage() {
    localStorage.setItem('currentPage', this.foodCornerService.recipeCategory);
  }
}

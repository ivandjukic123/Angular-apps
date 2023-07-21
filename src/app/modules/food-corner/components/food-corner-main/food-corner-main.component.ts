import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoodCornerService } from '../../services/food-corner.service';
import { FoodCorner } from '../../interfaces/food-corner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-corner',
  templateUrl: './food-corner-main.component.html',
  styleUrls: ['./food-corner-main.component.scss']
})
export class FoodCornerMainComponent implements OnInit, OnDestroy {
  searchRecipes: string = '';
  recipes: FoodCorner[] = [];
  subscription?: Subscription;
  cartData = this.foodCornerService.getWishlistItemsValue();

  constructor(public foodCornerService: FoodCornerService) {
  }

  ngOnInit(): void {
    const recipesValue = localStorage.getItem('currentPage');
    if (recipesValue) {
      this.searchRecipes = this.foodCornerService.recipeCategory;
    }

    this.foodCornerService.getRecipes(this.searchRecipes);
    this.subscription = this.foodCornerService.recipes$
      .subscribe((value: FoodCorner[]) => {
        this.recipes = value;
      });

    const value = localStorage.getItem('foodInCart');
    if (value) {
      this.cartData = JSON.parse(value);
      this.foodCornerService.setWishlistItems(this.cartData);
    }
  }

  onSearchClick(value: string): void {
    this.searchRecipes = value;
    this.foodCornerService.getRecipes(this.searchRecipes);
  }

  onCartClick(data: FoodCorner): void {
    const date = new Date();
    const time = date.getTime();

    data = {
      ...data,
      localId: time
    };

    const existingProduct = this.foodCornerService.getWishlistItemsValue().find(item => {
      return item.id === data.id;
    });
    if (!existingProduct) {
      this.foodCornerService.getWishlistItemsValue().push(data);
    }
    console.log('main cart', this.foodCornerService.getWishlistItemsValue());

    localStorage.setItem('foodInCart', JSON.stringify(this.foodCornerService.getWishlistItemsValue()));
    this.foodCornerService.getRecipes(this.searchRecipes);
  }

  onRecipeDetailClick(id: number): void {
    this.foodCornerService.recipeId = id;
    localStorage.setItem('foodDetail', JSON.stringify(this.foodCornerService.recipeId));
  }

  cartItemsToStorage(): void {
    localStorage.setItem('foodInCart', JSON.stringify(this.foodCornerService.getWishlistItemsValue()));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

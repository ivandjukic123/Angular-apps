import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, Subject } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { FoodCornerResponse } from '../interfaces/food-corner-response';
import { FoodCorner } from '../interfaces/food-corner';
import { FoodCornerDetails } from '../interfaces/food-corner-details';

@Injectable({
  providedIn: 'root'
})
export class FoodCornerService {
  recipeId: number = 0;
  recipeCategory: string = '';
  private _wishlistRecipes = new BehaviorSubject<FoodCorner[]>([]);
  wishlistRecipes$ = this._wishlistRecipes.asObservable();
  private _recipes = new BehaviorSubject<FoodCorner[]>([]);
  recipes$ = this._recipes.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  setWishlistItems(value: FoodCorner[]): void {
    return this._wishlistRecipes.next(value);
  }

  getWishlistItemsValue(): FoodCorner[] {
    return this._wishlistRecipes.getValue();
  }

  setRecipes(value: FoodCorner[]): void {
    return this._recipes.next(value);
  }

  getRecipesValue(): FoodCorner[] {
    return this._recipes.getValue();
  }

  getRecipes(query: string): void {
    this.httpClient.get<FoodCornerResponse>(`${ConfigService.URLS.FOOD_CORNER_URL}${ConfigService.ROUTES.recipes}${ConfigService.ROUTES.complexSearch}?${ConfigService.KEYS.FoodCorner}&query=${query}`)
      .pipe(
        map((value: FoodCornerResponse) => {
          this.recipeCategory = query;
          value.results.forEach((item: FoodCorner) => {
            this.getWishlistItemsValue().forEach((cartItem: FoodCorner) => {
              if (item.id === cartItem.id) {
                item.selected = true;
              }
            });
          });
          return value.results;
        }),
        catchError(error => {
          console.log(error);
          return of([]);
        })
      )
      .subscribe((value: FoodCorner[]) => {
        this.setRecipes(value);
      });
  }

  getRecipeInfo(id: number): Observable<FoodCornerDetails> {
    return this.httpClient.get<FoodCornerDetails>(`${ConfigService.URLS.FOOD_CORNER_URL}${ConfigService.ROUTES.recipes}/${id}${ConfigService.ROUTES.information}?${ConfigService.KEYS.FoodCorner}`);
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FoodCornerService } from '../../services/food-corner.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Observable, Subject, Subscription } from 'rxjs';
import { FoodCornerDetails } from '../../interfaces/food-corner-details';
import { FoodCorner } from '../../interfaces/food-corner';

@Component({
  selector: 'app-food-corner-detail',
  templateUrl: './food-corner-detail.component.html',
  styleUrls: ['./food-corner-detail.component.scss']
})
export class FoodCornerDetailComponent implements OnInit, OnDestroy {
  successCartMessage: string = '';
  subscription: Subscription[] = [];
  success: Subject<string> = new Subject<string>();
  recipeInfo$!: Observable<FoodCornerDetails>;
  noResponseImg: string = 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg';
  @ViewChild('cartAlert', { static: false }) cartAlert?: NgbAlert;

  constructor(public foodCornerService: FoodCornerService) {
  }

  ngOnInit(): void {
    const value = localStorage.getItem('foodDetail');
    if (value) {
      this.foodCornerService.recipeId = JSON.parse(value);
    }

    this.recipeInfo$ = this.foodCornerService.getRecipeInfo(this.foodCornerService.recipeId);

    this.subscription.push(
      this.success.subscribe(message => {
        this.successCartMessage = message;
      })
    );
    this.success.pipe(debounceTime(1000)).subscribe(() => {
      if (this.cartAlert) {
        this.cartAlert.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  onAddToCart(recipe: FoodCornerDetails): void {
    const date = new Date();
    const time = date.getTime();

    let data: FoodCorner = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      imageType: 'jpg',
      selected: true,
      localId: time
    };
    this.foodCornerService.getWishlistItemsValue().push(data);
    console.log('detail cart', this.foodCornerService.getWishlistItemsValue());
    this.success.next(`Added to wishlist!`);
    localStorage.setItem('foodInCart', JSON.stringify(this.foodCornerService.getWishlistItemsValue()));
  }

  toMainPage() {
    localStorage.setItem('currentPage', this.foodCornerService.recipeCategory);
  }
}

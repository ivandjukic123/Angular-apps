import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static URLS = {
    DUMMY_URL: 'https://dummyjson.com',
    FORDONSBOLAGET_URL: 'https://web-api-test.fordonsbolaget.se/api/v1',
    FOOD_CORNER_URL: 'https://api.spoonacular.com',
    WEATHER_URL: 'https://api.weatherapi.com/v1/forecast.json',
    CITY_IMAGE_URL: 'https://api.teleport.org/api/urban_areas'
  }
  // here is where we planned to add many routes, no need for different object per single route.
  static ROUTES = {
    todos: '/todos',
    users: '/users',
    posts: '/posts',
    comments: '/comments',
    products: '/products',
    search: '/search',
    categories: '/categories',
    category: '/category',
    sellCar: '/email/sell-your-car',
    getCarByName: '/cars/slug',
    showInterest: '/email/show-interest',
    recipes: '/recipes',
    complexSearch: '/complexSearch',
    information: '/information'
  };

  static KEYS = {
    FoodCorner: 'apiKey=579f301d9db248d68b957cd7cf44a1d6',
    Weather: 'key=6611648eddd0468ca52114301231301'
  }

  constructor() {
  }
}

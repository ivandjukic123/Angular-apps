import { CityImage, Links } from './city-image';

export interface CityImageResponse {
  _links: Links;
  photos: CityImage[];
}

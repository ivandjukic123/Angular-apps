import { Car } from './buy-car';

export interface BuyCarResponse {
  data: Car[];
  message: string;
  responseCode: number;
}

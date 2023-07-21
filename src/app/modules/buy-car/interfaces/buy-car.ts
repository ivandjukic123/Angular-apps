export interface Car {
  id: number;
  model: string;
  yearModel: number;
  mileage: number;
  price: number;
  discount: number;
  color: string;
  slug: string;
  fuelType: string;
  regNo: string;
  make: string;
  gearBoxType: string;
  images: string[];
  similarCars: Car[];
}

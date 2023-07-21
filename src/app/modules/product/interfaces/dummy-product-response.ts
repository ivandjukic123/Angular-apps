import { DummyResponse } from './dummy-response';
import { DummyProduct } from './dummy-product';

export interface DummyProductResponse extends DummyResponse {
  products: DummyProduct[];
}

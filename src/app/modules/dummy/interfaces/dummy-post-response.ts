import { DummyPost } from './dummy-post';
import { DummyResponse } from './dummy-response';

export interface DummyPostResponse extends DummyResponse {
  posts: DummyPost[];
}

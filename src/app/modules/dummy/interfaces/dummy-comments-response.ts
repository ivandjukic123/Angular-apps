import { DummyComments } from './dummy-comments';
import { DummyResponse } from './dummy-response';

export interface DummyCommentsResponse extends DummyResponse {
  comments: DummyComments[];
}

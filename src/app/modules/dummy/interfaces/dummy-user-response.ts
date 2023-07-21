import { DummyUser } from './dummy-user';
import { DummyResponse } from './dummy-response';

export interface DummyUserResponse extends DummyResponse {
  users: DummyUser[];
}

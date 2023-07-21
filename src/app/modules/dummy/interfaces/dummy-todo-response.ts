import { DummyResponse } from './dummy-response';
import { DummyTodo } from './dummy-todo';

export interface DummyTodoResponse extends DummyResponse {
  todos: DummyTodo[];
}

export interface DummyComments {
  id: number;
  body: string;
  postId: number;
  user: User;
}

export interface User {
  id: number;
  username: string;
}

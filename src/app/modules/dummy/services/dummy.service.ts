import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';
import { DummyTodoResponse } from '../interfaces/dummy-todo-response';
import { DummyTodo } from '../interfaces/dummy-todo';
import { DummyUser } from '../interfaces/dummy-user';
import { DummyUserResponse } from '../interfaces/dummy-user-response';
import { DummyPost } from '../interfaces/dummy-post';
import { DummyPostResponse } from '../interfaces/dummy-post-response';
import { DummyComments } from '../interfaces/dummy-comments';
import { DummyCommentsResponse } from '../interfaces/dummy-comments-response';

@Injectable({
  providedIn: 'root'
})
export class DummyService {
  selectedTag: string = '';
  postHttpParams = {
    // total has no API effect, but is useful when we calculate how many posts are left
    total: 0,
    //limit tells API how much we want to load
    limit: 5,
    //skip tells API how many to skip
    skip: 0
  };

  //so if we want to load additional 30 posts, we send { limit: 30, skip: 30 }, if we want another 30 { limit: 30, skip: 60 }

  constructor(private http: HttpClient) {
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
  }

  /**
   * Most basic way we do http calls / Bad
   */
  getDummyTodos0() {
    return this.http.get('https://dummyjson.com/todos');
  }

  /**
   * Most basic way we do http calls with description of return type Observable<any>
   */
  getDummyTodos(): Observable<any> {
    return this.http.get('https://dummyjson.com/todos');
  }

  /**
   * Better way
   * We use proper return type of both method and http call
   * Also for url we use static values from config service so we don't need to type manual api names always.
   */
  getDummyTodos1(): Observable<DummyTodoResponse> {
    return this.http.get<DummyTodoResponse>(ConfigService.URLS.DUMMY_URL + ConfigService.ROUTES.todos);
  }

  /**
   * Even Better way
   * Now we return Observable of DummyTodo arrays, how ?
   * In http call we map (remember MAP transforms data) and we return part of response not all
   * We want todos only not all other data from response!
   * Also, we change mode we render url `${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.todos}`
   * Same thing, just ES6 standard, and oneliner.
   */
  getDummyTodos2(): Observable<DummyTodo[]> {
    return this.http.get<DummyTodoResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.todos}`)
      .pipe(
        map((value: DummyTodoResponse) => {
          console.log(value);
          return value.todos;
        })
      );
  }

  /**
   * Even Better way x 2
   * We add catch error handing and return empty array if something fails!
   */
  getDummyTodos3(): Observable<DummyTodo[]> {
    return this.http.get<DummyTodoResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.todos}`)
      .pipe(
        map((value: DummyTodoResponse) => {
          console.log(value);
          return value.todos;
        }),
        catchError(err => {
          console.log(err);
          return of([]);
        })
      );
  }

  /**
   * Even Better way x 3
   * We add description to catch error and print where it happened, and add better return type
   */
  getDummyTodos4(): Observable<DummyTodo[]> {
    return this.http.get<DummyTodoResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.todos}`)
      .pipe(
        map((value: DummyTodoResponse) => {
          console.log(value);
          return value.todos;
        }),
        catchError(this.handleError<DummyTodo[]>('getDummyTodos4', []))
      );
  }

  //dummy users
  getDummyUsers(): Observable<DummyUser[]> {
    return this.http.get<DummyUserResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.users}`)
      .pipe(
        map((value: DummyUserResponse) => {
          console.log(value);
          return value.users;
        }),
        catchError(error => {
          console.log(error);
          return of([]);
        })
      );
  }

  // get dummy posts
  getDummyPosts(): Observable<DummyPost[]> {
    const httpParams = new HttpParams({ fromObject: this.postHttpParams });
    return this.http.get<DummyPostResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.posts}`, { params: httpParams })
      .pipe(
        map((value: DummyPostResponse) => {
          this.postHttpParams.total = +value.total;
          this.postHttpParams.skip = this.postHttpParams.limit + Number(value.skip);
          return value.posts;
        }),
        catchError(error => {
          console.log(error);
          return of([]);
        })
      );
  }

  getDummyPostById(id: number): Observable<DummyPost> {
    return this.http.get<DummyPost>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.posts}/${id}`);
  }

  // This is now static hardcoded route call /1, make it dynamic ID coming from method getDummyUserById
  // return type of getDummyUserById is Observable<any>, and this.http.get is <any>, we can use proper interface in this case DummyUser
  getDummyUserById(id: number): Observable<DummyUser> {
    return this.http.get<DummyUser>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.users}/${id}`)
      .pipe(
        delay(1000)
      );
  }

  getDummyComments(id: number): Observable<DummyComments[]> {
    return this.http.get<DummyCommentsResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.posts}/${id}${ConfigService.ROUTES.comments}`)
      .pipe(
        map((value: DummyCommentsResponse) => {
          console.log(value);
          return value.comments;
        }),
        catchError(error => {
          console.log(error);
          return of([]);
        })
      );
  }

  // dummy comments
  // getDummyCommentsById(id: number): Observable<DummyComments> {
  //   return this.http.get<DummyComments>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.posts}/${id}${ConfigService.ROUTES.comments}`);
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

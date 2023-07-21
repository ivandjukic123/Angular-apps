import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  url: string = 'https://dummyjson.com';

  constructor(private http: HttpClient) {
  }

  getTodos(): Observable<any> {
    return this.http.get<any>(`${this.url}/todos`)
      .pipe(
        map(value => {
          console.log(value);
          return value.todos;
        }),
        catchError(err => {
          console.log(err);
          return of([]);
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private httpClient: HttpClient) {
  }

  sendShowInterestEmail(data: any): Observable<any> {
    return this.httpClient.post(`${ConfigService.URLS.FORDONSBOLAGET_URL}${ConfigService.ROUTES.showInterest}`, data);
  }
}

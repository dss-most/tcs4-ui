import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TestMethod } from './domain/test-method';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private server = 'http://localhost:8080/tcs4';

  private apiUrl = function(url) {
    return this.server + url;
  };

  constructor(private http: HttpClient) { }

  getTestMethod(
    pageNumber = 0, pageSize= 10): Observable<TestMethod[]> {
      return this.http.get(this.apiUrl('/TestMethod'), {
        params: new HttpParams()
          .set('pagerNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
      }).pipe(
        map(response => response['payload'])
      );
  }
}

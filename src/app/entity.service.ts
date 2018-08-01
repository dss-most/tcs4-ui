import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TestMethod } from './domain/test-method';
import { Page } from './domain/page';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private server = 'http://localhost:8080/tcs4';

  private apiUrl = function(url) {
    return this.server + url;
  };

  constructor(private http: HttpClient) { }

  findAllTestMethod(
    pageNumber = 0, pageSize= 10, sortField= '', sortDirection= ''): Observable<Page<TestMethod[]>> {
      return this.http.get<Page<TestMethod[]>>(this.apiUrl('/TestMethod'), {
        params: new HttpParams()
          .set('pageNum', pageNumber.toString())
          .set('pageSize', pageSize.toString())
          .set('sortField', sortField)
          .set('sortDirection', sortDirection)
      });
  }
}

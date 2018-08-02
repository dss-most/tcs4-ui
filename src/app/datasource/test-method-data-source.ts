import { DataSource } from '@angular/cdk/table';
import { TestMethod } from '../domain/test-method';
import { Page } from '../domain/page';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EntityService } from '../entity.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

export class TestMethodDataSource implements DataSource<TestMethod> {

  private testMethods = new BehaviorSubject<TestMethod[]>([]);
  private loadingTestMethod = new BehaviorSubject<boolean>(false);
  private totalElements = new BehaviorSubject<number>(0);

  public loading$ = this.loadingTestMethod.asObservable();
  public totalElelments$ = this.totalElements.asObservable();

  constructor(private entityService: EntityService) {}

  connect(collectionViewer: CollectionViewer): Observable<TestMethod[]> {
    return this.testMethods.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.testMethods.complete();
    this.loadingTestMethod.complete();
  }

  loadTestMethods(query= '', pageIndex = 0, pageSize = 10, sortField= '', sortDirection= '') {
   this.loadingTestMethod.next(true);
   this.entityService.findAllTestMethod(query, pageIndex, pageSize, sortField, sortDirection).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingTestMethod.next(false))
   )
   .subscribe( (res: Page<TestMethod[]>) => {
     this.totalElements.next(res['totalElements']);
     return this.testMethods.next(res['content']);
    });
  }

}

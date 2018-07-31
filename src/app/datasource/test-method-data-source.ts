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
  private totalElements: number = 0;

  public loading$ = this.loadingTestMethod.asObservable();

  constructor(private entityService: EntityService) {}

  connect(collectionViewer: CollectionViewer): Observable<TestMethod[]> {
    return this.testMethods.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.testMethods.complete();
    this.loadingTestMethod.complete();
  }

  getTotalElements(): number {
    return this.totalElements;
  }

  loadTestMethods(pageIndex = 0, pageSize = 10) {
   this.loadingTestMethod.next(true);
   this.entityService.findAllTestMethod(pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingTestMethod.next(false))
   )
   .subscribe( (res: Page<TestMethod[]>) => {
     this.totalElements = res.totalElements;
     return this.testMethods.next(res['content']);
    })
  }

}

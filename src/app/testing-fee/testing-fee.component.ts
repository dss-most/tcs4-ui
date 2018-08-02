import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { MatPaginator, MatSpinner, MatSort } from '@angular/material';
import { EntityService } from '../entity.service';
import { TestMethodDataSource } from '../datasource/test-method-data-source';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
export interface TestingMethod {
  id: number;
  code: string;
  nameTh: string;
  fee: number;
}

@Component({
  selector: 'app-testing-fee',
  templateUrl: './testing-fee.component.html',
  styleUrls: ['./testing-fee.component.scss']
})
export class TestingFeeComponent implements OnInit, AfterViewInit {

  dataSource: TestMethodDataSource;
  totalElements: number;
  displayedColumns: string[] = ['id', 'code', 'nameTh', 'fee'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(private entityService: EntityService) {
   }

  ngOnInit() {
    this.dataSource = new TestMethodDataSource(this.entityService);
    this.dataSource.loadTestMethods();
    this.dataSource.totalElelments$.subscribe(
      totalElements => this.totalElements = totalElements
    );
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          console.log(this.input.nativeElement.value);
          this.paginator.pageIndex = 0;
          this.loadTestMethods();
        })
      ).subscribe();


    this.sort.sortChange.subscribe( () => this.paginator.pageIndex = 0 );

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap( () => this.loadTestMethods())
    )
    .subscribe();
  }

  loadTestMethods() {
    this.dataSource.loadTestMethods(
      this.input.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction
    );

  }

}

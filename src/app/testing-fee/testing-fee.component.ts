import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSpinner } from '@angular/material';
import { EntityService } from '../entity.service';
import { TestMethodDataSource } from '../datasource/test-method-data-source';
import { tap } from 'rxjs/operators';
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

  constructor(private entityService: EntityService) {
   }

  ngOnInit() {
    this.dataSource = new TestMethodDataSource(this.entityService);
    this.dataSource.loadTestMethods();
    this.totalElements = this.dataSource.getTotalElements();
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap( () => this.loadTestMethods())
    )
    .subscribe();
  }

  loadTestMethods() {
    this.dataSource.loadTestMethods(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );

  }

}

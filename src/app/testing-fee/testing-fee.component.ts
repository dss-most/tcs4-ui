import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSpinner } from '@angular/material';
import { EntityService } from '../entity.service';
import { TestMethodDataSource } from '../datasource/test-method-data-source';
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
  displayedColumns: string[] = ['id', 'code', 'nameTh', 'fee'];

  @ViewChild(MatPaginator) paginator: MatPaginator;





  constructor(private entityService: EntityService) {
   }

  ngOnInit() {
    this.dataSource = new TestMethodDataSource(this.entityService);
    this.dataSource.loadTestMethods();
  }

  ngAfterViewInit() {
  }

}

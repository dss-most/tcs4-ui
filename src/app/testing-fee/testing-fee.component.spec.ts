import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingFeeComponent } from './testing-fee.component';

describe('TestingFeeComponent', () => {
  let component: TestingFeeComponent;
  let fixture: ComponentFixture<TestingFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

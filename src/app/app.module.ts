import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule,
  MatTableModule, MatExpansionModule, MatProgressSpinnerModule, MatProgressBarModule,
  MatPaginatorModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { TestingFeeComponent } from './testing-fee/testing-fee.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MyNavComponent,
    TestingFeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

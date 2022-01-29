import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgChartsAngularModule } from 'ag-charts-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { View1Component } from './components/view1/view1.component';
import { View2Component } from './components/view2/view2.component';
import { View3Component } from './components/view3/view3.component';
import { View4Component } from './components/view4/view4.component';
import { View5Component } from './components/view5/view5.component';
@NgModule({
  declarations: [
    AppComponent,
    View1Component,
    View2Component,
    View3Component,
    View4Component,
    View5Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,

    ScrollingModule,
    MatToolbarModule,
    MatIconModule,
    ClipboardModule,
    AgChartsAngularModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

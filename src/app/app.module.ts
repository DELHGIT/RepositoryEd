import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GstAddComponent } from './gst-add/gst-add.component';
import { GstGetComponent } from './gst-get/gst-get.component';
import { GstEditComponent } from './gst-edit/gst-edit.component';
import { HttpErrorHandler }     from './http-error-handler.service';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { BusinessService } from './business.service';
import { HeroesComponent } from './heroes/heroes.component';
@NgModule({
   declarations: [ AppComponent, GstAddComponent,GstGetComponent, GstEditComponent,HeroesComponent],
   imports: [  BrowserModule,AppRoutingModule,SlimLoadingBarModule, ReactiveFormsModule, HttpClientModule,FormsModule],
   providers: [ BusinessService,HttpErrorHandler ],
   bootstrap: [ AppComponent]
})
export class AppModule { }

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DialogModule } from './shared-dialogs/dialog.module';
import { SharedModule } from './shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { DialogCenter1Component } from './app-dialogs/dialog-center1/dialog-center1.component';
import { Dialog1Component } from './app-dialogs/dialog1/dialog1.component';
import { Dialog2Component } from './app-dialogs/dialog2/dialog2.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ToolMenuComponent } from './tool-menu/tool-menu.component';

@NgModule({
  declarations: [
	AppComponent,
	DragDropComponent,
	HomeComponent,
	FooterComponent,
	ToolMenuComponent,
	DatepickerComponent,
	DialogExampleComponent,
	Dialog1Component,
	Dialog2Component,
	DialogCenter1Component
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
	AppRoutingModule,
	MDBBootstrapModule.forRoot(),
	SharedModule,
	DialogModule.registerDialogs([
		Dialog1Component,
		Dialog2Component,
		DialogCenter1Component
	]),
	DragDropModule,
	FormsModule,
	ReactiveFormsModule,
	MatInputModule,
	MatFormFieldModule,
	MatSelectModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

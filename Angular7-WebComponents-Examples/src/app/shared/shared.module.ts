import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AnchoredCardComponent } from './components/anchored-card/anchored-card.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { IconStackedComponent } from './components/icon-stacked/icon-stacked.component';
import { ToolMenuComponent } from './components/tooltip-menu/tooltip-menu.component';

@NgModule({
  imports: [
	CommonModule,
	MDBBootstrapModule.forRoot(),
	BsDatepickerModule.forRoot()
  ],
  declarations: [
	ToolMenuComponent,
	IconStackedComponent,
	DatePickerComponent,
	CustomButtonComponent,
	AnchoredCardComponent
  ],
  exports: [
	MDBBootstrapModule,
	ToolMenuComponent,
	IconStackedComponent,
	DatePickerComponent,
	CustomButtonComponent,
	AnchoredCardComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}

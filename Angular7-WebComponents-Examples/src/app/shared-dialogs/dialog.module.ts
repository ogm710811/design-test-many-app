import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SharedModule } from '../shared/shared.module';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { DialogCenterComponent } from './components/dialog-center/dialog-center.component';
import { DialogFooterComponent } from './components/dialog-footer/dialog-footer.component';
import { DialogRightLargeComponent } from './components/dialog-right/dialog-right-large.component';
import { DialogRightSmallComponent } from './components/dialog-right/dialog-right-small.component';
import { DialogTargetComponent } from './components/dialog-target/dialog-target.component';
import { DialogService, REGISTERED_DIALOGS } from './services/dialog.service';

@NgModule({
	imports: [ CommonModule, FormsModule, MDBBootstrapModule.forRoot(), SharedModule ],
	exports: [
		DialogBodyComponent,
		DialogCenterComponent,
		DialogFooterComponent,
		DialogRightLargeComponent,
		DialogRightSmallComponent,
		DialogTargetComponent
	],
	declarations: [
		DialogBodyComponent,
		DialogCenterComponent,
		DialogFooterComponent,
		DialogRightLargeComponent,
		DialogRightSmallComponent,
		DialogTargetComponent
	],
	providers: [ DialogService ]
})
export class DialogModule {
	public static registerDialogs(dialogs: any[]): ModuleWithProviders {
		return {
			ngModule: DialogModule,
			providers: [
				{ provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: dialogs, multi: true },
				{ provide: REGISTERED_DIALOGS, useValue: dialogs }
			]
		};
	}
}

import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'app-dialog-footer',
	template: `<ng-content></ng-content>`
})
export class DialogFooterComponent {
	@HostBinding('class.modal-footer') public modalFooterClass = true;

	constructor() {}
}

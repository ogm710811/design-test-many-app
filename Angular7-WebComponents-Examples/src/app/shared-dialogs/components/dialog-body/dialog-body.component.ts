import { Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-dialog-body',
	template: `<ng-content></ng-content>`
})
export class DialogBodyComponent {
	@HostBinding('class.modal-body') public modalBodyClass = true;

	constructor(private readonly elementRef: ElementRef, private renderer: Renderer2) {}

	public scrollToTop() {
		this.elementRef.nativeElement.scrollTop = 0;
		this.renderer.addClass(this.elementRef.nativeElement, 'scrollbar--sm');
	}
}

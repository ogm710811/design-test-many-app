import { ElementRef, ViewChild } from '@angular/core';
import { TooltipDirective } from 'angular-bootstrap-md';

export abstract class TooltipMenuBase {
	@ViewChild('tooltip') public tooltip: TooltipDirective;
	@ViewChild('tooltip', { read: ElementRef })
	public tooltipElem: ElementRef;

	public close(e?: FocusEvent) {
		// if (this.tooltip) this.tooltip.hide();
	}
}

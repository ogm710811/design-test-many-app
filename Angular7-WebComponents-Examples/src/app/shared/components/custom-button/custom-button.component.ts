import { Component, OnInit } from '@angular/core';
import { CustomButtonIconPositions } from '../../enums/custom-button-icon-positions.enum';
import { CustomButtonBase } from '../../models/custom-button-base';
import { TooltipMenuSettings } from '../../models/tooltip-menu-settings';

@Component({
	selector: 'app-custom-button',
	templateUrl: './custom-button.component.html',
	styleUrls: [ './custom-button.component.scss' ]
})
export class CustomButtonComponent extends CustomButtonBase implements OnInit {
	public get showIconBefore(): boolean {
		return this.buttonSettings.iconPosition === CustomButtonIconPositions.before;
	}

	public get showIconAfter(): boolean {
		return this.buttonSettings.iconPosition === CustomButtonIconPositions.after;
	}

	public get isDisabled(): boolean {
		if (typeof this.buttonSettings.dynamicDisabled === 'function') return this.buttonSettings.dynamicDisabled();

		return false;
	}

	public get tooltipSettings(): TooltipMenuSettings {
		if (typeof this.buttonSettings.tooltip === 'function') return this.buttonSettings.tooltip();

		return null;
	}

	public cssClasses: string[] = [];
	public color: string;

	constructor() {
		super();
	}

	public ngOnInit() {
		this.cssClasses = this.buttonSettings.extraCss.concat(this.buttonSettings.paddingCss);
		// this.cssClasses.push(this.buttonSettings.color);
		this.color = this.buttonSettings.color;
		this.settingsChange.emit(this.buttonSettings);
	}

	public clickHandler(e: Event | MouseEvent) {
		this.actionEmitter.emit(e);
		if (typeof this.buttonSettings.action === 'function') {
			this.buttonSettings.action(e);
		}
	}
}

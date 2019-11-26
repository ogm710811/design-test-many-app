import { EventEmitter, Input, Output } from '@angular/core';
import { CustomButtonColors } from '../enums/custom-button-colors.enum';
import { CustomButtonIconPositions } from '../enums/custom-button-icon-positions.enum';
import { CustomButtonSettings } from './custom-button-settings';

export abstract class CustomButtonBase {
	private static readonly buttonSettingsDefault: CustomButtonSettings = {
		color: CustomButtonColors.default,
		text: 'SAVE',
		type: 'submit',
		extraCss: ['m-0'],
		paddingCss: [],
		iconPosition: CustomButtonIconPositions.before,
		iconType: 'single',
		iconClasses: [ 'fa-save' ]
	};

	private _buttonSettings: CustomButtonSettings;

	@Input()
	public set buttonSettings(buttonSettings: CustomButtonSettings) {
		this._buttonSettings = { ...CustomButtonBase.buttonSettingsDefault, ...buttonSettings };
		this.settingsChange.emit(this.buttonSettings);
	}

	public get buttonSettings(): CustomButtonSettings {
		return this._buttonSettings;
	}

	@Input()
	public set type(type: string) {
		this.buttonSettings.type = type;
		this.settingsChange.emit(this.buttonSettings);
	}

	public get type(): string {
		return this.buttonSettings.type;
	}

	@Output()
	public get click(): EventEmitter<Event> {
		return this.actionEmitter;
	}
	@Output() public actionEmitter = new EventEmitter<Event>();
	@Output() public settingsChange = new EventEmitter<CustomButtonSettings>();
}

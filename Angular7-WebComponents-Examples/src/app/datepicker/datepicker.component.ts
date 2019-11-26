import { Component, OnInit } from '@angular/core';
import { DatePickerTemplates } from '../shared/enums/date-picker-templates.enum';
import { DatePickerFormats } from './../shared/enums/date-picker-formats.enum';
import { DatePickerSettings } from './../shared/models/date-picker-settings';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: [ './datepicker.component.scss' ]
})
export class DatepickerComponent implements OnInit {
	private _datePicker: Map<string, DatePickerSettings> = new Map<string, DatePickerSettings>([
		[
			'single',
			{
				templateType: DatePickerTemplates.singledatepicker,
				placement: 'bottom',
				bsConfig: DatePickerFormats['MM/DD/YYYY'],
				hideOnscroll: true,
				isDisabled: false,
				outsideClick: true
			}
		],
		[
			'range',
			{
				templateType: DatePickerTemplates.rangedatepicker,
				placement: 'bottom',
				bsConfig: DatePickerFormats['MM/DD/YYYY'],
				hideOnscroll: true,
				isDisabled: false,
				outsideClick: true
			}
		]
	]);

	public get singleDatePickerSettings(): DatePickerSettings {
		return this._datePicker.get('single');
	}
	public get rangeDatePickerSettings(): DatePickerSettings {
		return this._datePicker.get('range');
	}

	constructor() {}

	public ngOnInit() {}
}

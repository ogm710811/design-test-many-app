import { Component, Input, OnInit } from '@angular/core';
import { DatePickerFormats } from '../../enums/date-picker-formats.enum';
import { DatePickerSettings } from '../../models/date-picker-settings';
import { DatePickerTemplates } from './../../enums/date-picker-templates.enum';

@Component({
	selector: 'app-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: [ './date-picker.component.scss' ]
})
export class DatePickerComponent implements OnInit {
	private static readonly datePickerSeetingDefault: DatePickerSettings = {
		templateType: DatePickerTemplates.singledatepicker,
		placement: '',
		placeholder: '',
		bsConfig: DatePickerFormats['MM/DD/YYYY'],
		hideOnscroll: true,
		isDisabled: false,
		outsideClick: true,
		container: '',
		triggers: ''
	};

	public datePickerTemplate = DatePickerTemplates;
	private _datePickerParams: DatePickerSettings;
	@Input()
	public set datePickerParams(datePickerParams: DatePickerSettings) {
		this._datePickerParams = { ...DatePickerComponent.datePickerSeetingDefault, ...datePickerParams };
	}

	public get datePickerParams(): DatePickerSettings {
		return this._datePickerParams;
	}

	public currentTemplate(template: DatePickerTemplates): boolean {
		return this.datePickerParams.templateType === template;
	}

	constructor() {}

	public ngOnInit() {}
}

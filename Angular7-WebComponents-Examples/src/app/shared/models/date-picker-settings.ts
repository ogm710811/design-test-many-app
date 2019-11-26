import { DatePickerFormats } from './../enums/date-picker-formats.enum';
import { DatePickerTemplates } from './../enums/date-picker-templates.enum';

export interface DatePickerSettings {
	templateType: DatePickerTemplates;
	placement: string;
	placeholder?: string;
	bsValue?: Date;
	bsRangeValue?: Date[];
	minDate?: Date;
	maxDate?: Date;
	bsConfig: DatePickerFormats;
	hideOnscroll: boolean;
	isDisabled: boolean;
	outsideClick: boolean;
	container?: string;
	triggers?: string;
}

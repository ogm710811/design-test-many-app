import { CustomButtonColors } from '../enums/custom-button-colors.enum';
import { CustomButtonIconPositions } from '../enums/custom-button-icon-positions.enum';
import { TooltipMenuSettings } from './tooltip-menu-settings';

export interface CustomButtonSettings {
	color?: CustomButtonColors;
	text?: string;
	type?: string;
	extraCss?: string[];
	paddingCss?: string[];
	iconPosition?: CustomButtonIconPositions;
	iconType?: string;
	iconClasses?: string[];

	tooltip?(): TooltipMenuSettings;

	dynamicDisabled?(): boolean;

	action?(e?: Event | MouseEvent): void;
}

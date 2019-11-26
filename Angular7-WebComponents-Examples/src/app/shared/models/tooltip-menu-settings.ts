import { TooltipTemplates } from '../enums/tooltip-menu-templates.enums';
import { TooltipMenuOptions } from './tooltip-menu-option';
import { TooltipMenuSettingsBase } from './tooltip-menu-settings-base';

export interface TooltipMenuSettings extends TooltipMenuSettingsBase {
	widthText?: string;
	templateType: TooltipTemplates;
	text?: string;
	currentView?: string;
	navigatorState?: string;
	hasNavigator?: boolean;
	iconFilter?: string;
	iconAction?: string;
	iconNav?: string;

	dynamicOptions?(): TooltipMenuOptions[];
	dynamicText?(): string;
	isChecked?(navClicked: string): boolean;
	setNavigationState?(): void;
}

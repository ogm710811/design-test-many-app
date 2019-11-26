import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TooltipTemplates } from '../../enums/tooltip-menu-templates.enums';
import { TooltipMenuBase } from '../../models/tooltip-menu-base';
import { TooltipMenuOptions } from '../../models/tooltip-menu-option';
import { TooltipMenuSettings } from '../../models/tooltip-menu-settings';
import { TooltipMenuService } from '../../services/tooltip-menu.service';

@Component({
  selector: 'app-tooltip-menu',
  templateUrl: './tooltip-menu.component.html',
  styleUrls: ['./tooltip-menu.component.scss']
})
export class ToolMenuComponent extends TooltipMenuBase
  implements OnInit, OnDestroy {
  public static readonly tooltipMenuSettingsDefault: TooltipMenuSettings = {
	templateType: TooltipTemplates.Default,
	title: '',
	widthText: '',
	text: '',
	currentView: '',
	navigatorState: '',
	hasNavigator: false,
	container: '',
	placement: '',
	iconFilter: '',
	iconAction: '',
	iconNav: '',
	disableGlobalAlignment: false
  };
  // private globalClickHandler: () => void;
  // @ViewChild('mainContainer')
  // private mainContainer: ElementRef;
  private _toolMenuParams: TooltipMenuSettings;
  @Input()
  public set toolMenuParams(tooltipMenuParams: TooltipMenuSettings) {
	this._toolMenuParams = {
		...ToolMenuComponent.tooltipMenuSettingsDefault,
		...tooltipMenuParams
	};
  }

  public get toolMenuParams() {
	return this._toolMenuParams;
  }

  public tooltipTemplates = TooltipTemplates;
  public options: TooltipMenuOptions[];
  public tooltipLabels: string[] = [];

  public currentTemplate(template: TooltipTemplates): boolean {
	return this.toolMenuParams.templateType === template;
  }
t
  public navCurrentView(check: string): boolean {
	const result =
		typeof this.toolMenuParams.isChecked === 'function' &&
		this.toolMenuParams.isChecked(check);
	return result;
  }

  private menuSetup() {
	if (typeof this.toolMenuParams.dynamicOptions === 'function') {
		this.options = this.toolMenuParams.dynamicOptions();
		this.tooltipLabels = [];
		this.options.forEach(o => {
		this.tooltipLabels.push(o.label);
		});
	}
  }

  constructor() {
	super();
	// this.initDebugFunction();
  }

  // private initDebugFunction(): void {
  // if (!(window as any).debugTooltips) {
  // 	(window as any).debugTooltips = () => {
  // 	this.globalClickHandler = this.renderer.listen(
  // 		'document',
  // 		'click',
  // 		this.onGlobalClick
  // 	);
  // 	};
  // }
  // }

  public ngOnInit() {
	this.menuSetup();
  }

  public ngOnDestroy() {
	// if (this.globalClickHandler) {
	// 	this.globalClickHandler();
	// 	(window as any).debugTooltips = null;
	// }
  }

  // private onGlobalClick = (event: MouseEvent) => {
  // if (event.ctrlKey && event.shiftKey) {
  // 	const mainContainer = this.mainContainer.nativeElement;
  // 	document.body.appendChild(mainContainer);

  // 	mainContainer.setAttribute(
  // 	'style',
  // 	`
  // 	position: absolute !important;
  // 	top: ${event.pageY - 20}px !important;
  // 	left: ${event.pageX - 20}px !important;
  // 	width: 40px !important;
  // 	height: 40px !important;
  // 	background: green !important;
  // 	z-index: 100 !important`
  // 	);

  // 	setTimeout(() => {
  // 	this.onActionButtonClick(event);
  // 	});
  // }
  // };

  public onActionButtonClick(e: MouseEvent) {
	e.preventDefault();
	e.stopImmediatePropagation();

	if (typeof this.toolMenuParams.dynamicOptions === 'function') {
		this.options = this.toolMenuParams.dynamicOptions();
	}

	// Allows for change detection to update values
	// if (!this.tooltip.isOpen) {
	// 	if (!this.toolMenuParams.disableGlobalAlignment) {
	// 	this.tooltipMenuService.checkBounds(e.clientX, e.clientY, this.tooltip);
	// 	}
	// 	setTimeout(() => {
	// 	if (this.toolMenuParams) {
	// 		this.tooltip.show();
	// 	}
	// 	});
	// }
	this.tooltip.show();
  }

  public get displayText(): string {
	if (typeof this.toolMenuParams.dynamicText === 'function') {
		return this.toolMenuParams.dynamicText();
	}
	return this.toolMenuParams.text;
  }
}

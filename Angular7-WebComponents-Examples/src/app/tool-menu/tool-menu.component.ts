import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TooltipMenuSettings } from '../shared/models/tooltip-menu-settings';
import { TooltipTemplates } from './../shared/enums/tooltip-menu-templates.enums';

@Component({
	selector: 'app-tool-menu',
	templateUrl: './tool-menu.component.html',
	styleUrls: [ './tool-menu.component.scss' ]
})
export class ToolMenuComponent implements OnInit {
	private _tooltipMenu: Map<string, TooltipMenuSettings> = new Map<string, TooltipMenuSettings>([
		[
			'info',
			{
				templateType: TooltipTemplates.Content,
				placement: 'bottom',
				text:
					'This tooltip template is to give user information. The content of the element can change depending of the user needs',
				widthText: '159'
			}
		],
		[
			'action',
			{
				templateType: TooltipTemplates.Action,
				iconAction: 'fa-plus-circle',
				placement: 'bottom',
				dynamicOptions: () => {
					const options = [
						{
							icon: 'fa-pencil',
							label: 'edit',
							action: () => {}
						},
						{
							icon: 'fa-save',
							label: 'save',
							action: () => {}
						},
						{
							icon: 'fa-folder-open',
							label: 'open folder',
							action: () => {}
						},
						{
							icon: 'fa-files-o',
							label: 'copy',
							action: () => {}
						}
					];
					return options;
				}
			}
		],
		[
			'help',
			{
				templateType: TooltipTemplates.Content,
				placement: 'bottom',
				text: 'Help Documents',
				widthText: '97'
			}
		],
		[
			'navigation',
			{
				templateType: TooltipTemplates.Nav,
				iconNav: 'fa-map-marker',
				placement: 'bottom',
				title: 'navigation',
				widthText: '79',
				isChecked: check => {
				  console.log('tooltip implementation:::', check)
					const checkUrl = this.router.url;
					return check === checkUrl.substr(1) ? true : false;
				},
				dynamicOptions: () => {
					return [
						{
							icon: 'fa-book',
							label: 'home',
							action: () => {
								this.router.navigate([ '/home' ]);
							}
						},
						{
							icon: 'fa-tags',
							label: 'drag & drop',
							action: () => {
								this.router.navigate([ '/dragdrop' ]);
							}
						},
						{
							icon: 'fa-bolt',
							label: 'toolmenu',
							action: () => {
								this.router.navigate([ '/toolmenu' ]);
							}
						},
						{
							icon: 'fa-folder',
							label: 'date picker',
							action: () => {
								this.router.navigate([ '/datepicker' ]);
							}
						}
					];
				}
			}
		]
	]);

	public get infoToolMenu() {
		return this._tooltipMenu.get('info');
	}

	public get actionTooltipMenuSettings(): TooltipMenuSettings {
		return this._tooltipMenu.get('action');
	}

	public get helpTooltipMenu(): TooltipMenuSettings {
		return this._tooltipMenu.get('help');
	}

	public get navigationTooltipMenuSettings(): TooltipMenuSettings {
		return this._tooltipMenu.get('navigation');
	}

	constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

	public ngOnInit() {}
}

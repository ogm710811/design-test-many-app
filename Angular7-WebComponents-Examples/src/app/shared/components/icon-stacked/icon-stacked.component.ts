import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-icon-stacked',
	templateUrl: './icon-stacked.component.html',
	styleUrls: [ './icon-stacked.component.scss' ]
})
export class IconStackedComponent implements OnInit {
	private _cssClasses: string[];
	@Input()
	public set cssClasses(cssClasses: string[]) {
		this._cssClasses = cssClasses;
	}

	public get cssClasses(): string[] {
		return this._cssClasses;
	}
	constructor() {}

	public ngOnInit() {}
}

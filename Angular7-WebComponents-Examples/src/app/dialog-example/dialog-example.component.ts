import { Component, OnInit } from '@angular/core';
import { Dialog1Model } from '../models/dialog1Model';
import { DialogService } from '../shared-dialogs/services/dialog.service';

@Component({
	selector: 'app-as-dialog-example',
	templateUrl: './dialog-example.component.html',
	styleUrls: [ './dialog-example.component.scss' ]
})
export class DialogExampleComponent implements OnInit {
	constructor(private readonly dialogService: DialogService) {}

	public ngOnInit() {}

	public openDialog(): boolean {
		this.dialogService.open('app-dialog1', new Dialog1Model()).then(
			saved => {
				// this.log.info(`Saved DIALOG1 from root`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOG1 from root`, err);
				// else
				// 	this.log.warn(`Closed DIALOG1 from root`);
			}
		);

		return false;
	}

	public openDisableClose(): boolean {
		this.dialogService.open('app-as-dialog-disable-close', new Dialog1Model()).then(
			saved => {
				// this.log.info(`Saved DIALOGDisableClose from root`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOGDisableClose from root`, err);
				// else
				// 	this.log.warn(`Closed DIALOGDisableClose from root`);
			}
		);

		return false;
	}
}

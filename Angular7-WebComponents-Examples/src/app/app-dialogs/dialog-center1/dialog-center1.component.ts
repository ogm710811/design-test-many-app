import { Component, OnInit } from '@angular/core';
import { Dialog1Model } from 'src/app/models/dialog1Model';
import { Dialog } from 'src/app/shared-dialogs/models/dialog';
import { DialogService } from 'src/app/shared-dialogs/services/dialog.service';
import { CustomButtonColors } from 'src/app/shared/enums/custom-button-colors.enum';
import { CustomButtonSettings } from 'src/app/shared/models/custom-button-settings';

@Component({
	selector: 'app-dialog-center1',
	templateUrl: './dialog-center1.component.html',
	styleUrls: [ './dialog-center1.component.scss' ]
})
export class DialogCenter1Component extends Dialog<Dialog1Model> implements OnInit {
	private _buttonSettings = [
		{
			iconClasses: [ 'fa-save' ],
			text: 'SAVE',
			color: CustomButtonColors.primary,
			type: 'submit',
			action: () => {
				this.save();
			}
		}
	];
	public get buttonSettings(): CustomButtonSettings[] {
		return this._buttonSettings;
	}

	constructor(dialogService: DialogService) {
		super(dialogService, Dialog1Model);
	}

	public ngOnInit(): void {}

	public show(): void {
		this.formData.level++;
	}

	public openDialog1(): boolean {
		this.dialogService.open('app-dialog1', this.formData).then(
			saved => {
				// this.log.info(`Saved DIALOG1 from DIALOG-CENTER`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOG1 from DIALOG-CENTER`, err);
				// else
				// 	this.log.warn(`Closed DIALOG1 from DIALOG-CENTER`);
			}
		);

		return false;
	}

	public openDialog2(): boolean {
		this.dialogService.open('app-as-dialog2', this.formData).then(
			saved => {
				// this.log.info(`Saved DIALOG2 from DIALOG-CENTER`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOG2 from DIALOG-CENTER`, err);
				// else
				// 	this.log.warn(`Closed DIALOG2 from DIALOG-CENTER`);
			}
		);

		return false;
	}

	public openDialog3(): boolean {
		this.dialogService.open('app-as-dialog3', this.formData).then(
			saved => {
				// this.log.info(`Saved DIALOG3 from DIALOG-CENTER`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOG3 from DIALOG-CENTER`, err);
				// else
				// 	this.log.warn(`Closed DIALOG3 from DIALOG-CENTER`);
			}
		);

		return false;
	}

	public openDisableClose(): boolean {
		this.dialogService.open('app-as-dialog-disable-close', this.formData).then(
			saved => {
				// this.log.info(`Saved DIALOGDisableClose from DIALOG-CENTER`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOGDisableClose from DIALOG-CENTER`, err);
				// else
				// 	this.log.warn(`Closed DIALOGDisableClose from DIALOG-CENTER`);
			}
		);

		return false;
	}

	public openDialogCenter(): boolean {
		this.dialogService.open('app-dialog-center1', this.formData).then(
			saved => {
				// this.log.info(`Saved DIALOG-CENTER from DIALOG-CENTER`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOG-CENTER from DIALOG-CENTER`, err);
				// else
				// 	this.log.warn(`Closed DIALOG-CENTER from DIALOG-CENTER`);
			}
		);

		return false;
	}

	public save(): boolean {
		this.close(true);
		return false;
	}
}

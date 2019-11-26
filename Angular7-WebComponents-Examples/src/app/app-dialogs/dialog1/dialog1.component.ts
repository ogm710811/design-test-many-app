import { Component, OnInit } from '@angular/core';
import { Dialog1Model } from 'src/app/models/dialog1Model';
import { Dialog } from 'src/app/shared-dialogs/models/dialog';
import { DialogService } from 'src/app/shared-dialogs/services/dialog.service';
import { CustomButtonColors } from 'src/app/shared/enums/custom-button-colors.enum';
import { TooltipTemplates } from 'src/app/shared/enums/tooltip-menu-templates.enums';
import { CustomButtonSettings } from 'src/app/shared/models/custom-button-settings';
import { TooltipMenuSettings } from 'src/app/shared/models/tooltip-menu-settings';

@Component({
	selector: 'app-dialog1',
	templateUrl: './dialog1.component.html',
	styleUrls: ['./dialog1.component.scss']
})
export class Dialog1Component extends Dialog<Dialog1Model> implements OnInit {
	private _buttonSettings = [
		{
			iconClasses: ['fa-save'],
			text: 'SAVE',
			color: CustomButtonColors.primary,
			type: 'submit',
			action: () => {
				this.save();
			}
		},
		{
			iconClasses: ['fa-external-link'],
			text: 'open dialog 1',
			color: CustomButtonColors.primary,
			type: 'submit',
			action: () => {
				this.openDialog1();
			}
		}
	];
	public get buttonSettings(): CustomButtonSettings[] {
		return this._buttonSettings;
	}
	private _headerTooltip = {
		templateType: TooltipTemplates.Dialog,
		placement: 'bottom',
		dynamicOptions: () => {
			return [
				{
					icon: 'fa-external-link',
					label: 'dialog 2',
					action: () => {
						this.openDialog2();
					}
				},
				{
					icon: 'fa-external-link',
					label: 'dialog 3',
					action: () => {
						this.close().catch(err => {
							// if (!err)

								// .catch(e => {
								// 	this.log.error('error:', e);
								// });
						});
					}
				}
			];
		}
	};
	public get headerTooltipMenuSettings(): TooltipMenuSettings {
		return this._headerTooltip;
	}
	constructor(
		dialogService: DialogService
		// private readonly log: LoggingService,
		// private readonly noty: NotyService
	) {
		super(dialogService, Dialog1Model);
	}

	public ngOnInit() { }

	public show(): void {
		this.formData.level++;
	}

	public openDialog1(): boolean {
		this.dialogService.open('app-dialog1', this.formData).then(
			saved => {
				// this.log.info(`Saved DIALOG1 from DIALOG1`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOG1 from DIALOG1`, err);
				// else
				// 	this.log.warn(`Closed DIALOG1 from DIALOG1`);
			}
		);

		return false;
	}

	public openDialog2(): boolean {
		this.dialogService.open('app-dialog2', this.formData).then(
			saved => {
				// this.log.info(`Saved DIALOG2 from DIALOG1`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOG2 from DIALOG1`, err);
				// else
				// 	this.log.warn(`Closed DIALOG2 from DIALOG1`);
			}
		);

		return false;
	}

	public openDialog3(): boolean {
		this.dialogService.open('app-as-dialog3', this.formData).then(
			saved => {
				// this.log.info(`Saved DIALOG3 from DIALOG1`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOG3 from DIALOG1`, err);
				// else
				// 	this.log.warn(`Closed DIALOG3 from DIALOG1`);
			}
		);

		return false;
	}

	public openDisableClose(): boolean {
		this.dialogService.open('app-as-dialog-disable-close', this.formData).then(
			saved => {
				// this.log.info(`Saved DIALOGDisableClose from DIALOG1`, saved);
			},
			err => {
				// if (err) this.log.error(`Error DIALOGDisableClose from DIALOG1`, err);
				// else this.log.warn(`Closed DIALOGDisableClose from DIALOG1`);
			}
		);

		return false;
	}

	public openDialogCenter(): boolean {
		this.dialogService.open('app-dialog-center1', this.formData).then(
			saved => {
				// this.log.info(`Saved DIALOG-CENTER from DIALOG1`, saved);
			},
			err => {
				// if (err)
				// 	this.log.error(`Error DIALOG-CENTER from DIALOG1`, err);
				// else
				// 	this.log.warn(`Closed DIALOG-CENTER from DIALOG1`);
			}
		);

		return false;
	}

	public save(): boolean {
		this.close(true);
		return false;
	}

	public openNoty(): boolean {
		// this.noty.open('test', NotyTypes.Success);
		return false;
	}
}

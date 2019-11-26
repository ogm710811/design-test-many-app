import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Dialog1Model } from 'src/app/models/dialog1Model';
import { Dialog } from 'src/app/shared-dialogs/models/dialog';
import { DialogService } from 'src/app/shared-dialogs/services/dialog.service';
import { CustomButtonColors } from 'src/app/shared/enums/custom-button-colors.enum';
import { TooltipTemplates } from 'src/app/shared/enums/tooltip-menu-templates.enums';
import { CustomButtonSettings } from 'src/app/shared/models/custom-button-settings';
import { TooltipMenuSettings } from 'src/app/shared/models/tooltip-menu-settings';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.scss']
})
export class Dialog2Component extends Dialog<Dialog1Model> implements OnInit {
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
		text: 'open dialog 2',
		color: CustomButtonColors.primary,
		type: 'submit',
		action: () => {
		this.openDialog2();
		}
	}
  ];
  public get buttonSettings(): CustomButtonSettings[] {
	return this._buttonSettings;
  }
  constructor(dialogService: DialogService) {
	super(dialogService, Dialog1Model);
  }
  public selectedValue: string;
  public foods: Food[] = [
	{ value: 'steak-0', viewValue: 'Steak' },
	{ value: 'pizza-1', viewValue: 'Pizza' },
	{ value: 'tacos-2', viewValue: 'Tacos' }
  ];

  public ngOnInit() {}

  public show(): void {
	this.formData.level++;
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

  public save(): boolean {
	this.close(true);
	return false;
  }
}

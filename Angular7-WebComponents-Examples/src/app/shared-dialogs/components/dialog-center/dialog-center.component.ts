import { Component, forwardRef, Renderer2 } from '@angular/core';
import { TweenService } from 'src/app/shared/services/tween.service';
import { DialogSkin } from '../../models/dialog-skin';
import { DialogSkinCenter } from '../../models/dialog-skin-center';

@Component({
	selector: 'app-dialog-center',
	templateUrl: '../dialog-common/dialog-common.component.html',
	styleUrls: [ '../dialog-common/dialog-common.component.scss' ],
	providers: [ { provide: DialogSkin, useExisting: forwardRef(() => DialogCenterComponent) } ]
})
export class DialogCenterComponent extends DialogSkinCenter {
	constructor(renderer: Renderer2, tweenService: TweenService) {
		super(renderer, tweenService);
	}
}

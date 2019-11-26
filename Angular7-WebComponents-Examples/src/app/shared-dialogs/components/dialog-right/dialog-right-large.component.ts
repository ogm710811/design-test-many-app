import { Component, forwardRef, Renderer2 } from '@angular/core';
import { TweenService } from 'src/app/shared/services/tween.service';
import { DialogSize } from '../../enums/dialog-size.enum';
import { DialogSkin } from '../../models/dialog-skin';
import { DialogSkinRight } from '../../models/dialog-skin-right';

@Component({
	selector: 'app-dialog-right-lg',
	templateUrl: '../dialog-common/dialog-common.component.html',
	styleUrls: [ '../dialog-common/dialog-common.component.scss' ],
	providers: [ { provide: DialogSkin, useExisting: forwardRef(() => DialogRightLargeComponent) } ]
})
export class DialogRightLargeComponent extends DialogSkinRight {
	constructor(renderer: Renderer2, tweenService: TweenService) {
		super(renderer, tweenService);
		this.size = DialogSize.LARGE;
	}
}

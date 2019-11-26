import { Renderer2 } from '@angular/core';
import { TweenService } from 'src/app/shared/services/tween.service';
import { DialogCommonComponent } from '../components/dialog-common/dialog-common.component';
import { DialogTransitions } from '../enums/dialog-transitions.enum';

export abstract class DialogSkinRight extends DialogCommonComponent {
	protected constructor(renderer: Renderer2, tweenService: TweenService) {
		super(renderer, tweenService);
		this.transition = DialogTransitions.FromRight;
		this.dialogClasses.push('modal-full-height', 'modal-right');
	}
}

import { Renderer2 } from '@angular/core';
import { TweenService } from 'src/app/shared/services/tween.service';
import { DialogSkin } from '../../models/dialog-skin';

// @Component({
// 	selector: 'bt-dialog-common',
// 	templateUrl: './dialog-common.component.html',
// 	styleUrls: ['./dialog-common.component.scss'],
// 	providers: [{provide: DialogSkin, useExisting: forwardRef(() => DialogCommonComponent) }]
// })
export abstract class DialogCommonComponent extends DialogSkin {
	protected constructor(renderer: Renderer2, tweenService: TweenService) {
		super(renderer, tweenService);
	}
}

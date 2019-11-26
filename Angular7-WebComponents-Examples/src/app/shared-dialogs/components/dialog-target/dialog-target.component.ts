import {
	Component,
	ComponentFactory,
	ComponentRef,
	HostListener,
	OnDestroy,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as $ from 'jquery';
import cloneDeep from 'lodash-es/cloneDeep';
import { Subject } from 'rxjs';
import { debounceTime, filter, first, takeUntil } from 'rxjs/operators';
import { TweenService } from 'src/app/shared/services/tween.service';
import { Dialog } from '../../models/dialog';
import { DialogOptions } from '../../models/dialog-options';
import { DialogPromise } from '../../models/dialog-promise';
import { DialogService } from '../../services/dialog.service';

@Component({
	selector: 'app-dialog-target',
	template: `<ng-template #dialogTarget></ng-template>`
})
export class DialogTargetComponent implements OnDestroy {
	private static readonly $html = $('html');
	private static debounceTimeMs = 100;

	@ViewChild('dialogTarget', { read: ViewContainerRef })
	private dialogTarget: ViewContainerRef;
	private openDialogs: ComponentRef<Dialog<any>>[] = [];
	private resize$ = new Subject<void>();
	private destroyed$ = new Subject<void>();

	private get topDialog(): Dialog<any> {
		if (this.openDialogs.length === 0) return null;

		return this.openDialogs[this.openDialogs.length - 1].instance;
	}

	public get isOpen(): boolean {
		return this.openDialogs.length > 0;
	}

	constructor(dialogService: DialogService, private readonly router: Router) {
		dialogService.registerTarget(this);

		this.resize$
			.pipe(debounceTime(DialogTargetComponent.debounceTimeMs), takeUntil(this.destroyed$))
			.subscribe(this.stackDialogs);

		this.router.events.pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.destroyed$)).subscribe(() => {
			this.closeAll();
		});
	}

	public ngOnDestroy(): void {
		this.resize$.complete();
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	@HostListener('window:resize', [ '$event' ])
	public onResize() {
		this.resize$.next();
	}

	@HostListener('document:keydown.esc', [ '$event' ])
	public onDocumentEsc($event): void {
		const top = this.topDialog;
		if (
			top &&
			$event &&
			$event.target &&
			$event.target.tagName !== 'TEXTAREA' &&
			$event.target.className.indexOf('select2') < 0
		) {
			top.onEsc();
		}
	}

	@HostListener('document:keydown.enter', [ '$event' ])
	public onDocumentEnter($event): void {
		const top = this.topDialog;
		if (
			top &&
			$event &&
			$event.target &&
			$event.target.tagName !== 'TEXTAREA' &&
			$event.target.className.indexOf('select2') < 0
		) {
			top.onEnter();
		}
	}

	private stackDialogs = (): void => {
		if (this.openDialogs.length === 0 || this.openDialogs[0].instance.closing) {
			setTimeout(() => {
				DialogTargetComponent.$html.css('overflow', '');
			}, TweenService.animationTime * 1000);
		} else DialogTargetComponent.$html.css('overflow', 'hidden');

		let topDialog = true;
		let prevLeft = 0;
		for (let i = this.openDialogs.length - 1; i >= 0; i--) {
			const dialog = this.openDialogs[i].instance;
			if (dialog.closing) {
				dialog.remove();
				this.openDialogs.splice(i, 1);
			} else if (dialog.skin.hasTransition) {
				if (topDialog) {
					dialog.skin.isTop = true;
					prevLeft = dialog.skin.reset();
					topDialog = false;
				} else {
					dialog.skin.isTop = false;
					prevLeft = dialog.skin.position(prevLeft).newLeft;
				}
			}
		}
	};

	public open<T>(
		factory: ComponentFactory<Dialog<any>>,
		item: T = null,
		options: DialogOptions = null
	): DialogPromise<T> {
		const component = this.dialogTarget.createComponent(factory) as ComponentRef<Dialog<T>>;
		component.instance.options = options;
		component.instance.formData = item !== null ? cloneDeep(item) : component.instance.createInstance();

		this.openDialogs.push(component);

		component.instance.events.onShown.pipe(first()).subscribe(this.stackDialogs);

		component.instance.events.onClose.pipe(first()).subscribe(this.stackDialogs);

		return new DialogPromise<T>(
			component.instance,
			component.instance.open(this.openDialogs.length > 1).finally(() => {
				this.remove(component);
			})
		);
	}

	private remove<T>(component: ComponentRef<Dialog<T>>): void {
		setTimeout(() => {
			component.destroy();
		}, 1000);
	}

	public closeAll(): void {
		for (let i = this.openDialogs.length - 1; i >= 0; i--) {
			const dialog = this.openDialogs[i].instance;
			dialog.close();
		}
	}
}

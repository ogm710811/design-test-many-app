import {
	ComponentRef,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	Renderer2,
	ViewChild
} from '@angular/core';
import { ModalBackdropComponent, ModalDirective } from 'angular-bootstrap-md';
import { TweenConfig, TweenMax } from 'gsap';
import { race, ReplaySubject, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { TooltipMenuSettings } from 'src/app/shared/models/tooltip-menu-settings';
import { TweenService } from '../../shared/services/tween.service';
import { DialogSize } from '../enums/dialog-size.enum';
import { DialogTransitions } from '../enums/dialog-transitions.enum';
import { CustomButtonSettings } from './../../shared/models/custom-button-settings';

export abstract class DialogSkin implements OnDestroy, OnInit {
	private static offset = 54;
	private static isTopClass = 'modal-noty-target';

	public static get defaultLeft() {
		return window.innerWidth - DialogSkin.offset;
	}

	private _contentClasses: string[] = [];
	private _isTop = true;
	private readonly destroyed$ = new Subject<void>();
	private readonly onClose$ = new Subject<void>();
	private readonly onTransitionComplete$ = new Subject<void>();
	private readonly onLoaded$ = new ReplaySubject<void>(1);

	@ViewChild('modal') protected modalElem: ElementRef;
	@ViewChild('modalDialog') protected modalDialogElem: ElementRef;

	private tween = {
		set: (options: TweenConfig): TweenMax => {
			return this.tweenService.set(this.modalDialogElem, options);
		},
		from: (options: TweenConfig): TweenMax => {
			return this.tweenService.from(this.modalDialogElem, options);
		},
		to: (options: TweenConfig): TweenMax => {
			return this.tweenService.to(this.modalDialogElem, options);
		}
	};

	protected size: DialogSize;

	public get width(): number {
		if (this.modalDialogElem && this.modalDialogElem.nativeElement)
			return this.modalDialogElem.nativeElement.offsetWidth;

		return 0;
	}

	public get hasTransition(): boolean {
		switch (this.transition) {
			case DialogTransitions.FromRight:
			case DialogTransitions.FromTop:
				return true;
			case DialogTransitions.None:
				return false;
			default:
				throw new Error(`Unknown transition ${this.transition}`);
		}
	}

	@ViewChild(ModalDirective) public modalApi: ModalDirective;
	@Input() public closeOnEnter: boolean;
	@Input() public disableClose: boolean;
	@Input() public header: string;
	@Input() public resolveOnClose = false;
	@Input() public tooltip: string;
	// public helpDocuments: HelpDocument = {
	// 	destination: 0,
	// 	hasHelpIcon: false
	// };
	// @Input()
	// set helpDocument(value: HelpDocument) {
	// 	this.helpDocuments.destination = value.destination;
	// 	this.helpDocuments.hasHelpIcon = value.hasHelpIcon;
	// }

	protected transition = DialogTransitions.None;

	//#region Classes
	public modalClasses: string[] = [];

	@Input()
	set modalClass(value: string) {
		this.modalClasses = value.split(' ');
	}

	public dialogClasses: string[] = [];

	@Input()
	set dialogClass(value: string) {
		this.dialogClasses = value.split(' ');
	}

	public set isTop(isTop: boolean) {
		this._isTop = isTop;
		this.updateIsTopClass();
	}

	public get isTop(): boolean {
		return this._isTop;
	}

	public set contentClasses(contentClasses: string[]) {
		this._contentClasses = contentClasses;
		this.updateIsTopClass(); // reinforce isTop class
	}

	public get contentClasses(): string[] {
		return this._contentClasses;
	}

	@Input()
	set contentClass(value: string) {
		this.contentClasses = value.split(' ');
	}

	public headerClasses: string[] = ['primary-color-dark', 'white-text'];

	@Input()
	set headerClass(value: string) {
		this.headerClasses = value.split(' ');
	}

	public footerClasses: string[] = ['white-text'];

	@Input()
	set footerClass(value: string) {
		this.footerClasses = value.split(' ');
	}

	public iconClasses: string[] = [];

	@Input()
	set iconClass(value: string) {
		this.iconClasses = value.split(' ');
	}

	@Input() public tooltipSettings?: TooltipMenuSettings;

	@Input() public headerButtonSettings?: CustomButtonSettings[];

	// @Input() public footerButtonSettings?: ButtonSettings[];
	//#endregion

	public readonly onClose = this.onClose$.asObservable();
	public readonly onTransitionComplete = this.onTransitionComplete$.asObservable();
	public readonly onLoaded = this.onLoaded$.asObservable();

	protected constructor(
		protected readonly renderer: Renderer2,
		private readonly tweenService: TweenService // private readonly pdfViewerService: PdfViewerService
	) {}

	public ngOnInit(): void {
		let sizeClass: string;
		switch (this.size) {
			case DialogSize.LARGE:
				sizeClass = 'app__dialog--lg';
				break;

			case DialogSize.SMALL:
				sizeClass = 'app__dialog--sm';
				break;
		}

		if (sizeClass) this.dialogClasses.push(sizeClass);

		this.modalApi.onShown
			.pipe(takeUntil(race([this.onLoaded$, this.destroyed$]).pipe(first())))
			.subscribe(() => {
				this.onTransitionComplete$.pipe(first()).subscribe(() => {
					this.onLoaded$.next(null);
				});
			});
	}

	public ngOnDestroy(): void {
		this.onTransitionComplete$.complete();
		this.onClose$.complete();
		this.onLoaded$.complete();
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	private updateIsTopClass(): any {
		const index = this.contentClasses.indexOf(DialogSkin.isTopClass);

		if (this.isTop) {
			if (index < 0) this.contentClasses.push(DialogSkin.isTopClass);
		} else {
			if (index >= 0) this.contentClasses.splice(index, 1);
		}
	}

	public hasIcon(): boolean {
		return this.iconClasses.length > 0;
	}

	public hasToolTip(): boolean {
		return !!this.tooltip;
	}

	public beforeShow() {
		switch (this.transition) {
			case DialogTransitions.FromRight:
				this.tween.set({
					left: `${window.innerWidth}px`
				});
				break;
			case DialogTransitions.FromTop:
				this.tween.set({
					top: '-500px',
					autoAlpha: '0'
				});
				break;
			case DialogTransitions.None:
				// intentionally left empty
				break;
			default:
				throw new Error(`Unknown transition ${this.transition}`);
		}
	}

	public backdropClick($event: MouseEvent): void {
		if ($event.defaultPrevented || $event.target !== $event.currentTarget)
			return;

		$event.preventDefault();

		if (!this.disableClose) this.onClose$.next();
	}

	public closeButtonClick($event: MouseEvent): void {
		if ($event.defaultPrevented) return;

		$event.preventDefault();

		if (!this.disableClose) this.onClose$.next();
	}

	public position(
		coveringDialogLeft: number
	): { newLeft: number; promise: Promise<void> } {
		switch (this.transition) {
			case DialogTransitions.FromRight:
				return this.positionLeft(coveringDialogLeft);
			case DialogTransitions.FromTop:
				return this.positionTop();
			default:
				throw new Error(`Unknown transition ${this.transition}`);
		}
	}

	private positionTop(
		zIndex = 1030,
		top = 0,
		autoAlpha = 1,
		disableMouse = false
	): { newLeft: number; promise: Promise<void> } {
		this.tweenService.set(this.modalElem, {
			'z-index': zIndex,
			'pointer-events': disableMouse ? 'none' : 'auto'
		});

		return {
			newLeft: DialogSkin.defaultLeft,
			promise: new Promise(resolve => {
				this.tween.to({
					top: `${top}px`,
					autoAlpha: `${autoAlpha}`,
					onComplete: () => {
						this.onTransitionComplete$.next();
						resolve();
					}
				});
			})
		};
	}

	private positionLeft(
		coveringDialogLeft: number,
		zIndex = 1030,
		disableMouse = false
	): { newLeft: number; promise: Promise<void> } {
		let newLeft = coveringDialogLeft - (this.width - DialogSkin.offset);

		if (newLeft < 0) newLeft = 0;

		this.tweenService.set(this.modalElem, {
			'z-index': zIndex,
			'pointer-events': disableMouse ? 'none' : 'auto'
		});

		return {
			newLeft: newLeft,
			promise: new Promise(resolve => {
				this.tween.to({
					left: `${newLeft}px`,
					onComplete: () => {
						this.onTransitionComplete$.next();
						resolve();
					}
				});
			})
		};
	}

	public reset(): number {
		switch (this.transition) {
			case DialogTransitions.FromRight:
				return this.positionLeft(DialogSkin.defaultLeft, 1050).newLeft;
			case DialogTransitions.FromTop:
				return this.positionTop(1050).newLeft;
			default:
				throw new Error(`Unknown transition ${this.transition}`);
		}
	}

	public remove(): Promise<void> {
		switch (this.transition) {
			case DialogTransitions.FromRight:
				return this.positionLeft(
					window.innerWidth + (this.width - DialogSkin.offset),
					1050,
					true
				).promise;
			case DialogTransitions.FromTop:
				return this.positionTop(1050, -500, 0, true).promise;
			case DialogTransitions.None:
				return Promise.resolve();
			default:
				throw new Error(`Unknown transition ${this.transition}`);
		}
	}

	public hideBackdrop(backdrop: ComponentRef<ModalBackdropComponent>) {
		this.tweenService.to(backdrop.location, { autoAlpha: 0 });
	}

	// public displayPdfViewer(): void {
	// 	this.pdfViewerService.open(this.helpDocuments.destination);
	// }
}

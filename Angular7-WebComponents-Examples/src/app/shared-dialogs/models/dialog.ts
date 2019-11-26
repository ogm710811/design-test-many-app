import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { first, take, takeUntil } from 'rxjs/operators';
import { DialogBodyComponent } from '../components/dialog-body/dialog-body.component';
import { DialogService } from '../services/dialog.service';
import { DialogOptions } from './dialog-options';
import { DialogSkin } from './dialog-skin';

export abstract class Dialog<T> implements AfterViewInit, OnDestroy {
	protected reject: (reason?: any) => void;
	protected resolve: (value?: T | PromiseLike<T>) => void;
	protected saveOnClose = false;
	protected rejectError: any;
	protected initialized$ = new ReplaySubject<boolean>(1);
	protected destroyed$ = new Subject<void>();

	private readonly _events: { [event: string]: Subject<void> } = {
		onClose: new Subject<void>(),
		onHide: new Subject<void>(),
		onHidden: new Subject<void>(),
		onShow: new Subject<void>(),
		onShown: new Subject<void>()
	};

	private modalApi: ModalDirective;
	private promise: Promise<T>;

	private _options: DialogOptions;
	get options(): DialogOptions {
		return this._options;
	}

	set options(options: DialogOptions) {
		this._options = options || {};
	}

	public closing = false;
	public formData: T;
	@ViewChild(DialogSkin) public skin: DialogSkin;
	@ViewChild(DialogBodyComponent) public body: DialogBodyComponent;

	public readonly events: { [event: string]: Observable<void> } = {
		onClose: this._events.onClose.asObservable(),
		onHide: this._events.onHide.asObservable(),
		onHidden: this._events.onHidden.asObservable(),
		onShow: this._events.onShow.asObservable(),
		onShown: this._events.onShown.asObservable()
	};

	protected constructor(
		protected readonly dialogService: DialogService,
		protected readonly constructorT: new () => T
	) {
		this.formData = this.createInstance();
		this.options = {};
	}

	public createInstance(): T {
		return new this.constructorT() as T;
	}

	public ngAfterViewInit() {
		this.modalApi = this.skin.modalApi;

		this.modalApi.config.focus = true;

		this.modalApi.onShow.pipe(takeUntil(this.destroyed$)).subscribe(this.onShow);

		this.modalApi.onShown.pipe(takeUntil(this.destroyed$)).subscribe(this.onShown);

		this.modalApi.onHide.pipe(takeUntil(this.destroyed$)).subscribe(this.onHide);

		this.modalApi.onHidden.pipe(takeUntil(this.destroyed$)).subscribe(this.onHidden);

		this.initialized$.next(true);
	}

	public ngOnDestroy() {
		this.initialized$.complete();
		this.destroyed$.next();
		this.destroyed$.complete();
		for (const event in this._events) {
			if (this._events.hasOwnProperty(event)) this._events[event].complete();
		}
	}

	public onEsc() {
		if (this.skin && !this.skin.disableClose) {
			this.close();
		}
	}

	public onEnter() {
		if (this.skin && this.skin.closeOnEnter && !this.skin.disableClose) {
			this.close();
		}
	}

	public open(hasUnderling: boolean): Promise<T> {
		this.promise = new Promise<T>((resolve, reject) => {
			this.rejectError = null;
			this.resolve = resolve;
			this.reject = reject;

			this.skin.onClose.pipe(take(1)).subscribe(() => {
				this.close();
			});

			this.initialized$.pipe(take(1)).subscribe(() => {
				this.modalApi.config.ignoreBackdropClick = true;
				this.modalApi.config.keyboard = false;
				this.modalApi.config.backdrop = hasUnderling ? false : 'static';
				this.modalApi.isAnimated = !this.skin.hasTransition;
				try {
					this.skin.beforeShow();
					this.modalApi.show();
					setTimeout(() => {
						this.show();
					});
				} catch (error) {
					this.close(false, error);
				}
			});
		});

		return this.promise;
	}

	public close = (resolve: boolean = null, error: any = null): Promise<T> => {
		this.saveOnClose = resolve == null ? this.skin.resolveOnClose : resolve;
		this.rejectError = error;
		this.closing = true;
		this._events.onClose.next();

		return this.promise;
	};

	private hide = (): void => {
		if (this.modalApi) this.modalApi.hide();
	};

	private onShow = (): void => {
		this._events.onShow.next();
	};

	private onShown = (): void => {
		this._events.onShown.next();

		if (this.body) this.body.scrollToTop();
	};

	private onHide = () => {
		this._events.onHide.next();

		if (this.resolve && this.reject) {
			if (this.saveOnClose) {
				if (this.options.autoSave) {
					if (typeof this.saveModel === 'function') {
						this.saveModel(this.formData).pipe(first()).subscribe(this.resolve, this.reject);
					} else this.reject('Dialog does not implement saving');
				} else this.resolve(this.formData);
			} else this.reject(this.rejectError);
		}

		this.formData = this.createInstance();
		this.resolve = null;
		this.reject = null;
	};

	private onHidden = (): void => {
		this._events.onHidden.next();
	};

	public abstract show(): void;

	public saveModel?(item: T): Observable<T>;

	public remove() {
		if (this.modalApi && (this.modalApi as any).backdrop) this.skin.hideBackdrop((this.modalApi as any).backdrop);

		this.skin.remove().finally(() => {
			this.hide();
		});
	}
}

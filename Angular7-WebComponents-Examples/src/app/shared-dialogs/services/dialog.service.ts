import { ComponentFactory, ComponentFactoryResolver, Inject, Injectable, InjectionToken } from '@angular/core';
import { DialogTargetComponent } from '../components/dialog-target/dialog-target.component';
import { Dialog } from '../models/dialog';
import { DialogOptions } from '../models/dialog-options';
import { DialogPromise } from '../models/dialog-promise';

export const REGISTERED_DIALOGS = new InjectionToken<any[]>('registeredDialogs.config');

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private factories = new Map<string, ComponentFactory<Dialog<any>>>();
	private target: DialogTargetComponent;

	constructor(
		@Inject(REGISTERED_DIALOGS) dialogs: any[],
		private readonly resolver: ComponentFactoryResolver // private readonly noty: NotyService
	) {
		// this.noty.registerIsDialogOpen(this.isOpen);
		this.registerDialogs(dialogs);
	}

	public isOpen = (): boolean => {
		return this.target.isOpen;
	};

	private registerDialogs(dialogs: any[]) {
		if (this.factories.size === 0) {
			dialogs.forEach(dialog => {
				const factory = this.resolver.resolveComponentFactory(dialog);
				if (factory && factory.selector)
					this.factories.set(factory.selector, factory as ComponentFactory<Dialog<any>>);
			});
		}
	}

	public registerTarget(target: DialogTargetComponent) {
		this.target = target;
	}

	public open<T>(selector, item: T = null, options: DialogOptions = null): DialogPromise<T> {
		// this.noty.closeAll();

		if (!this.factories.has(selector)) return DialogPromise.reject(`Dialog ${selector} not found`);
		return this.target.open(this.factories.get(selector), item, options);
	}
}

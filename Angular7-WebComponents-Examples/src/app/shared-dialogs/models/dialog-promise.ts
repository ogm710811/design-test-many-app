import { OnDestroy } from '@angular/core';
import { Dialog } from './dialog';

export class DialogPromise<T> implements Promise<T>, OnDestroy {
	public readonly [Symbol.toStringTag]: 'Promise';

	private readonly promise: Promise<T>;

	public static reject<T>(reason: any): DialogPromise<T> | DialogPromise<never> {
		return new DialogPromise(null, Promise.reject(reason));
	}

	public static resolve<T>(instance: Dialog<T>, value?: T | PromiseLike<T>): DialogPromise<T> | DialogPromise<void> {
		return new DialogPromise(instance, Promise.resolve<T>(value));
	}

	constructor(private _instance: Dialog<T>, promise: Promise<T>) {
		this.promise = promise
			.then(result => {
				this.clearInstance();
				return result;
			})
			.catch(err => {
				this.clearInstance();
				throw err;
			});
	}

	public ngOnDestroy(): void {
		this.clearInstance();
	}

	public getInstance<U extends Dialog<T>>(): U {
		return this._instance as U;
	}

	private clearInstance() {
		this._instance = null;
	}

	public catch<TResult>(
		onrejected?: ((reason: any) => PromiseLike<TResult> | TResult) | null | undefined
	): Promise<T | TResult> {
		return this.promise.catch(onrejected);
	}

	public then<TResult1, TResult2>(
		onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | null | undefined,
		onrejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null | undefined
	): Promise<TResult1 | TResult2> {
		return this.promise.then(onfulfilled, onrejected);
	}

	public finally<U>(onFinally?: () => U | PromiseLike<U>): Promise<T> {
		return this.promise.finally(onFinally);
	}
}

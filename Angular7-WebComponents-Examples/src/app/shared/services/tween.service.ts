import { ElementRef, Injectable } from '@angular/core';
import { TweenConfig } from 'gsap';
import { Expo, TweenMax } from 'gsap/all';

@Injectable({
	providedIn: 'root'
})
export class TweenService {
	public static get animationTime(): number {
		return 0.75;
	}

	private static defaultOptions: TweenConfig = {
		ease: Expo.easeOut,
		force3D: true
	};

	private static extend(options: TweenConfig): TweenConfig {
		return { ...this.defaultOptions, ...options };
	}

	public set(element: ElementRef, options: TweenConfig): TweenMax {
		return TweenMax.set(element.nativeElement, TweenService.extend(options));
	}

	public from(element: ElementRef, options: TweenConfig, animationTime = TweenService.animationTime): TweenMax {
		return TweenMax.from(element.nativeElement, animationTime, TweenService.extend(options));
	}

	public to(element: ElementRef, options: TweenConfig, animationTime = TweenService.animationTime): TweenMax {
		return TweenMax.to(element.nativeElement, animationTime, TweenService.extend(options));
	}

	public kill(element: ElementRef): TweenMax {
		return TweenMax.killTweensOf(element.nativeElement);
	}
}

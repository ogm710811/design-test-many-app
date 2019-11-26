import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  Renderer2,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  ApplicationRef,
  EmbeddedViewRef, ViewContainerRef, TemplateRef, Type, ViewChild
} from '@angular/core';
import {TooltipComponent} from './tooltip/tooltip.component';
import {TooltipContainerDirective} from './tooltip/tooltip-container.directive';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @ViewChild(TooltipContainerDirective) insertionPoint: TooltipContainerDirective;
  @Input('tooltip') tooltipContent: string | TemplateRef<any> | Type<any>;
  @Input() placement: string;
  @Input() delay: string;
  tooltip: HTMLElement;
  offset = 10;

  private componentRef : ComponentRef<TooltipComponent>;

  constructor(
      private el: ElementRef,
      private renderer: Renderer2,
      private resolver: ComponentFactoryResolver,
      private injector: Injector,
      private appRef: ApplicationRef,
      public viewContainerRef: ViewContainerRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    // if (!this.tooltip) { this.show(); }
    this.show();
  }

  @HostListener('mouseleave') onMouseLeave() {
    // if (this.tooltip) { this.hide(); }
    // this.hide();
  }

  show() {
    this.createTooltip();
    // this.create();
    // this.setPosition();
    // this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  hide() {
    // this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    // window.setTimeout(() => {
    //   this.renderer.removeChild(document.body, this.tooltip);
    //   this.tooltip = null;
    // }, Number(this.delay));
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  createTooltip() {
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = Injector.create({providers: [
      {
        provide: 'tooltipConfig',
        useValue: {
          host: this.el.nativeElement
        }
      }
      ]
    });

    this.componentRef = this.viewContainerRef.createComponent(factory, 0, injector, this.generateNgContent());
    // const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    // document.body.appendChild(domElem);

  }

  generateNgContent() {
    if ( typeof this.tooltipContent === 'string' ) {
      const element = this.renderer.createText(this.tooltipContent);
      return [ [ element ] ];
    }
  }

  create() {
    this.tooltip = this.renderer.createElement('span');

    // this.renderer.appendChild(
    //   this.tooltip,
    //   this.renderer.createText(this.tooltipContent) // textNode
    // );

    this.renderer.appendChild(document.body, this.tooltip);
    // this.renderer.appendChild(this.el.nativeElement, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);

    // delay 설정
    this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
  }

  setPosition() {
    // 호스트 요소의 사이즈와 위치 정보
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    console.log('hostPos::TooltipDirective:', hostPos)
    // tooltip 요소의 사이즈와 위치 정보
    const tooltipPos = this.tooltip.getBoundingClientRect();
    console.log('hostPos::TooltipDirective:', tooltipPos)

    // window의 scroll top
    // getBoundingClientRect 메소드는 viewport에서의 상대적인 위치를 반환한다.
    // 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    // 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}

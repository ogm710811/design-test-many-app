import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TooltipContainerDirective} from './tooltip-container.directive';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  topElement : number;
  offset = 10;
  @ViewChild(TooltipContainerDirective, { read: ElementRef }) private tooltipContainer;

  constructor(
      @Inject('tooltipConfig') private config,
      private renderer: Renderer2) { }

  ngOnInit() {
    this.setPosition();
  }

  setPosition() {
    // let top, left;

    const hostPos = this.config.host.getBoundingClientRect();
    console.log('hostPos::TooltipComponent:', hostPos)
    const tooltipPos = this.tooltipContainer.nativeElement.getBoundingClientRect();
    console.log('hostPos::TooltipComponent:', tooltipPos)

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // console.log('scrollPos::TooltipComponent:', scrollPos)

    // top = hostPos.top - tooltipPos.height - this.offset;
    // left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    //
    // this.renderer.setStyle(this.tooltipContainer.nativeElement, 'top', `${top + scrollPos}px`);
    // this.renderer.setStyle(this.tooltipContainer.nativeElement, 'left', `${left}px`);

    const { top } = this.config.host.getBoundingClientRect();
    const { height } = this.tooltipContainer.nativeElement.getBoundingClientRect();
    console.log('topEl::TooltipComponent:', top)
    console.log('height::TooltipComponent:', height)
    // this.top = `${topEl - height}px`;
    this.topElement = top - height;
    console.log('top style::TooltipComponent:', this.topElement)
  }

}

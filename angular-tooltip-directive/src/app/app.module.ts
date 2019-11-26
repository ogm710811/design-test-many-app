import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipContainerDirective } from './tooltip/tooltip-container.directive';

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    TooltipContainerDirective,
    TooltipComponent
  ],
  entryComponents: [TooltipComponent],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TooltipMenuService } from './tooltip-menu.service';

describe('Service: TooltipMenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TooltipMenuService]
    });
  });

  it('should ...', inject([TooltipMenuService], (service: TooltipMenuService) => {
    expect(service).toBeTruthy();
  }));
});

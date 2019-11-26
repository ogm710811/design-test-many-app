/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TweenService } from './tween.service';

describe('Service: Tween', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TweenService]
    });
  });

  it('should ...', inject([TweenService], (service: TweenService) => {
    expect(service).toBeTruthy();
  }));
});

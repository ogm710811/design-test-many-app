/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IconStackedComponent } from './icon-stacked.component';

describe('IconStackedComponent', () => {
  let component: IconStackedComponent;
  let fixture: ComponentFixture<IconStackedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconStackedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconStackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

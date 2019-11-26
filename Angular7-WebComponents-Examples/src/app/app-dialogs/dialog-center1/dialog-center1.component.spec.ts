/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogCenter1Component } from './dialog-center1.component';

describe('DialogCenter1Component', () => {
  let component: DialogCenter1Component;
  let fixture: ComponentFixture<DialogCenter1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCenter1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCenter1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

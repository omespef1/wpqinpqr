import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WgnfpassComponent } from './wgnfpass.component';

describe('WgnfpassComponent', () => {
  let component: WgnfpassComponent;
  let fixture: ComponentFixture<WgnfpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WgnfpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WgnfpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

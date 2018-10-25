import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EccotizComponent } from './eccotiz.component';

describe('EccotizComponent', () => {
  let component: EccotizComponent;
  let fixture: ComponentFixture<EccotizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EccotizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EccotizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

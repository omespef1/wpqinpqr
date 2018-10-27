import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocoxcnComponent } from './socoxcn.component';

describe('SocoxcnComponent', () => {
  let component: SocoxcnComponent;
  let fixture: ComponentFixture<SocoxcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocoxcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocoxcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmplyeeComponent } from './gestion-emplyee.component';

describe('GestionEmplyeeComponent', () => {
  let component: GestionEmplyeeComponent;
  let fixture: ComponentFixture<GestionEmplyeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEmplyeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEmplyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

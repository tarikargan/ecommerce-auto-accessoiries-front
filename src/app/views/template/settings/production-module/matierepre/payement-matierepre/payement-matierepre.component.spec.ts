import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementMatierepreComponent } from './payement-matierepre.component';

describe('PayementMatierepreComponent', () => {
  let component: PayementMatierepreComponent;
  let fixture: ComponentFixture<PayementMatierepreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayementMatierepreComponent]
    });
    fixture = TestBed.createComponent(PayementMatierepreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

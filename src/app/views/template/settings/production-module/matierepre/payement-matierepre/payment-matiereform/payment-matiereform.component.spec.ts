import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMatiereformComponent } from './payment-matiereform.component';

describe('PaymentMatiereformComponent', () => {
  let component: PaymentMatiereformComponent;
  let fixture: ComponentFixture<PaymentMatiereformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMatiereformComponent]
    });
    fixture = TestBed.createComponent(PaymentMatiereformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

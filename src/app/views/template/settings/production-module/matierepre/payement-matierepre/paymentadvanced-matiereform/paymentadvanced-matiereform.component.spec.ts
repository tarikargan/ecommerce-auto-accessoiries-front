import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentadvancedMatiereformComponent } from './paymentadvanced-matiereform.component';

describe('PaymentadvancedMatiereformComponent', () => {
  let component: PaymentadvancedMatiereformComponent;
  let fixture: ComponentFixture<PaymentadvancedMatiereformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentadvancedMatiereformComponent]
    });
    fixture = TestBed.createComponent(PaymentadvancedMatiereformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

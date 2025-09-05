import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPaiementComponent } from './production-paiement.component';

describe('ProductionPaiementComponent', () => {
  let component: ProductionPaiementComponent;
  let fixture: ComponentFixture<ProductionPaiementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionPaiementComponent]
    });
    fixture = TestBed.createComponent(ProductionPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

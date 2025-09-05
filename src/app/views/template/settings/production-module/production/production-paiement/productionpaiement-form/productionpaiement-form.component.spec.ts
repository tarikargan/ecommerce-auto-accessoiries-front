import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionpaiementFormComponent } from './productionpaiement-form.component';

describe('ProductionpaiementFormComponent', () => {
  let component: ProductionpaiementFormComponent;
  let fixture: ComponentFixture<ProductionpaiementFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionpaiementFormComponent]
    });
    fixture = TestBed.createComponent(ProductionpaiementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

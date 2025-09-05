import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionpaiementadvancedFormComponent } from './productionpaiementadvanced-form.component';

describe('ProductionpaiementadvancedFormComponent', () => {
  let component: ProductionpaiementadvancedFormComponent;
  let fixture: ComponentFixture<ProductionpaiementadvancedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionpaiementadvancedFormComponent]
    });
    fixture = TestBed.createComponent(ProductionpaiementadvancedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

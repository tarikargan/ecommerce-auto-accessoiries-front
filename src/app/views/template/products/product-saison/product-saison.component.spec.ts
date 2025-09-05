import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSaisonComponent } from './product-saison.component';

describe('ProductSaisonComponent', () => {
  let component: ProductSaisonComponent;
  let fixture: ComponentFixture<ProductSaisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSaisonComponent]
    });
    fixture = TestBed.createComponent(ProductSaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductqutailleFormComponent } from './productqutaille-form.component';

describe('ProductqutailleFormComponent', () => {
  let component: ProductqutailleFormComponent;
  let fixture: ComponentFixture<ProductqutailleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductqutailleFormComponent]
    });
    fixture = TestBed.createComponent(ProductqutailleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

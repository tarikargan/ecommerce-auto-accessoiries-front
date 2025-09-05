import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantitetailleComponent } from './product-quantitetaille.component';

describe('ProductQuantitetailleComponent', () => {
  let component: ProductQuantitetailleComponent;
  let fixture: ComponentFixture<ProductQuantitetailleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductQuantitetailleComponent]
    });
    fixture = TestBed.createComponent(ProductQuantitetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

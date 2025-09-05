import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionQuantitetailleComponent } from './production-quantitetaille.component';

describe('ProductionQuantitetailleComponent', () => {
  let component: ProductionQuantitetailleComponent;
  let fixture: ComponentFixture<ProductionQuantitetailleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionQuantitetailleComponent]
    });
    fixture = TestBed.createComponent(ProductionQuantitetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

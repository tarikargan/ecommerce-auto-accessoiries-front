import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionqutailleFormComponent } from './productionqutaille-form.component';

describe('ProductionqutailleFormComponent', () => {
  let component: ProductionqutailleFormComponent;
  let fixture: ComponentFixture<ProductionqutailleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionqutailleFormComponent]
    });
    fixture = TestBed.createComponent(ProductionqutailleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryFormComponent } from './subcategory-form.component';

describe('SubcategoryFormComponent', () => {
  let component: SubcategoryFormComponent;
  let fixture: ComponentFixture<SubcategoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoryFormComponent]
    });
    fixture = TestBed.createComponent(SubcategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

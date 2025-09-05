import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogcategoryFormComponent } from './blogcategory-form.component';

describe('BlogcategoryFormComponent', () => {
  let component: BlogcategoryFormComponent;
  let fixture: ComponentFixture<BlogcategoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogcategoryFormComponent]
    });
    fixture = TestBed.createComponent(BlogcategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

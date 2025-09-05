import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMatierepremiereComponent } from './form-matierepremiere.component';

describe('FormMatierepremiereComponent', () => {
  let component: FormMatierepremiereComponent;
  let fixture: ComponentFixture<FormMatierepremiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMatierepremiereComponent]
    });
    fixture = TestBed.createComponent(FormMatierepremiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

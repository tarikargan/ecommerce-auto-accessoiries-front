import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgroryFormComponent } from './catgrory-form.component';

describe('CatgroryFormComponent', () => {
  let component: CatgroryFormComponent;
  let fixture: ComponentFixture<CatgroryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatgroryFormComponent]
    });
    fixture = TestBed.createComponent(CatgroryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

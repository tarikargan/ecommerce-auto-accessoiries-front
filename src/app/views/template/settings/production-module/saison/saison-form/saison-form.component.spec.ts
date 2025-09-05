import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisonFormComponent } from './saison-form.component';

describe('SaisonFormComponent', () => {
  let component: SaisonFormComponent;
  let fixture: ComponentFixture<SaisonFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaisonFormComponent]
    });
    fixture = TestBed.createComponent(SaisonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

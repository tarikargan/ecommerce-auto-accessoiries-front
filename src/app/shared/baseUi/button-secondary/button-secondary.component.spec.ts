import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSecondaryComponent } from './button-secondary.component';

describe('ButtonSecondaryComponent', () => {
  let component: ButtonSecondaryComponent;
  let fixture: ComponentFixture<ButtonSecondaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSecondaryComponent]
    });
    fixture = TestBed.createComponent(ButtonSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

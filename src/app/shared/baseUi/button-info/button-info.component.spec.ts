import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInfoComponent } from './button-info.component';

describe('ButtonInfoComponent', () => {
  let component: ButtonInfoComponent;
  let fixture: ComponentFixture<ButtonInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonInfoComponent]
    });
    fixture = TestBed.createComponent(ButtonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

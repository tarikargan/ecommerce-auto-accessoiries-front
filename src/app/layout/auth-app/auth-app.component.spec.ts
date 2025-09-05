import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAppComponent } from './auth-app.component';

describe('AuthAppComponent', () => {
  let component: AuthAppComponent;
  let fixture: ComponentFixture<AuthAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthAppComponent]
    });
    fixture = TestBed.createComponent(AuthAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

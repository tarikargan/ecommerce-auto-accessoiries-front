import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliyticsComponent } from './analiytics.component';

describe('AnaliyticsComponent', () => {
  let component: AnaliyticsComponent;
  let fixture: ComponentFixture<AnaliyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnaliyticsComponent]
    });
    fixture = TestBed.createComponent(AnaliyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

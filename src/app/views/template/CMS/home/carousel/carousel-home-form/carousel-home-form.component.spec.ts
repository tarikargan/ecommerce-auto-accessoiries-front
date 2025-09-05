import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHomeFormComponent } from './carousel-home-form.component';

describe('CarouselHomeFormComponent', () => {
  let component: CarouselHomeFormComponent;
  let fixture: ComponentFixture<CarouselHomeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselHomeFormComponent]
    });
    fixture = TestBed.createComponent(CarouselHomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

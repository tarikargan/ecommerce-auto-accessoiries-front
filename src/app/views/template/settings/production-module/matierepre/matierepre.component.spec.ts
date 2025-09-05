import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatierepreComponent } from './matierepre.component';

describe('MatierepreComponent', () => {
  let component: MatierepreComponent;
  let fixture: ComponentFixture<MatierepreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatierepreComponent]
    });
    fixture = TestBed.createComponent(MatierepreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

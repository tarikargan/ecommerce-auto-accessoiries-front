import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailleComponent } from './taille.component';

describe('TailleComponent', () => {
  let component: TailleComponent;
  let fixture: ComponentFixture<TailleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TailleComponent]
    });
    fixture = TestBed.createComponent(TailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

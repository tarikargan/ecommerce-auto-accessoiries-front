import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeLivraisonComponent } from './mode-livraison.component';

describe('ModeLivraisonComponent', () => {
  let component: ModeLivraisonComponent;
  let fixture: ComponentFixture<ModeLivraisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeLivraisonComponent]
    });
    fixture = TestBed.createComponent(ModeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

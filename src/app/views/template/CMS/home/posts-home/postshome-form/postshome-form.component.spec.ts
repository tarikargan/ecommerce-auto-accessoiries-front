import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostshomeFormComponent } from './postshome-form.component';

describe('PostshomeFormComponent', () => {
  let component: PostshomeFormComponent;
  let fixture: ComponentFixture<PostshomeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostshomeFormComponent]
    });
    fixture = TestBed.createComponent(PostshomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

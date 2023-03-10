import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordWithVisibilityComponent } from './input-password-with-visibility.component';

describe('InputPasswordWithVisibilityComponent', () => {
  let component: InputPasswordWithVisibilityComponent;
  let fixture: ComponentFixture<InputPasswordWithVisibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPasswordWithVisibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPasswordWithVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

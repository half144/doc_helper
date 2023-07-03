import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariosFormComponent } from './scenarios-form.component';

describe('ScenariosFormComponent', () => {
  let component: ScenariosFormComponent;
  let fixture: ComponentFixture<ScenariosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScenariosFormComponent]
    });
    fixture = TestBed.createComponent(ScenariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

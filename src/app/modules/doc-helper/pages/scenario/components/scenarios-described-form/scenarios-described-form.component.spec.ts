import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariosDescribedFormComponent } from './scenarios-described-form.component';

describe('ScenariosDescribedFormComponent', () => {
  let component: ScenariosDescribedFormComponent;
  let fixture: ComponentFixture<ScenariosDescribedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScenariosDescribedFormComponent]
    });
    fixture = TestBed.createComponent(ScenariosDescribedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

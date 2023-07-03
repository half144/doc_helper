import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocHelperComponent } from './doc-helper.component';

describe('DocHelperComponent', () => {
  let component: DocHelperComponent;
  let fixture: ComponentFixture<DocHelperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocHelperComponent]
    });
    fixture = TestBed.createComponent(DocHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

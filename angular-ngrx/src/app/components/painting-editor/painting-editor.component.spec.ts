import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaintingEditorComponent } from './painting-editor.component';

describe('PaintingEditorComponent', () => {
  let component: PaintingEditorComponent;
  let fixture: ComponentFixture<PaintingEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

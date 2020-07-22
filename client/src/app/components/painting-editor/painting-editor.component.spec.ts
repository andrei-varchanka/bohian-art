import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingEditorComponent } from './painting-editor.component';

describe('PaintingEditorComponent', () => {
  let component: PaintingEditorComponent;
  let fixture: ComponentFixture<PaintingEditorComponent>;

  beforeEach(async(() => {
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

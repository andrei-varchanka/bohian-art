import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingAddingComponent } from './painting-adding.component';

describe('PaintingAddingComponent', () => {
  let component: PaintingAddingComponent;
  let fixture: ComponentFixture<PaintingAddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingAddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

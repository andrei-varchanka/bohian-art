import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import {RangeComponent} from "../range/range.component";
import {CheckboxGroupComponent} from "../checkbox-group/checkbox-group.component";

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryComponent, RangeComponent, CheckboxGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

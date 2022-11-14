import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import {RangeComponent} from "../../modules/shared/components/range/range.component";
import {CheckboxGroupComponent} from "../../modules/shared/components/checkbox-group/checkbox-group.component";

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(waitForAsync(() => {
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

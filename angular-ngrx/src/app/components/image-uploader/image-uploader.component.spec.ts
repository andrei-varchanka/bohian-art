import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ImageUploaderComponent} from './image-uploader.component';
import {SafeHtmlPipe} from '../../pipes/safe-html.pipe';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


describe('ImageUploaderComponent', () => {
  let component: ImageUploaderComponent;
  let fixture: ComponentFixture<ImageUploaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImageUploaderComponent, SafeHtmlPipe],
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

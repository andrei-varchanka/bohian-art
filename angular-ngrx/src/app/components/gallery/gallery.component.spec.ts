import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { GalleryComponent } from './gallery.component';
import {RangeComponent} from "../../modules/shared/components/range/range.component";
import {CheckboxGroupComponent} from "../../modules/shared/components/checkbox-group/checkbox-group.component";
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let initialState = {};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryComponent, RangeComponent, CheckboxGroupComponent ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: { 
            snapshot: {
              queryParams: of({
                genres: [],
                widthFrom: 0,
                widthTo: 0,
                heightFrom: 0,
                heightTo: 0,
                priceFrom: 0,
                priceTo: 0,
                userId: ''
              })
            }
          }
        },
      ]
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

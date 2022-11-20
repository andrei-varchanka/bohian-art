import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { PaintingComponent } from './painting.component';

describe('PaintingComponent', () => {
  let component: PaintingComponent;
  let fixture: ComponentFixture<PaintingComponent>;
  let initialState = {};
  let actions: Observable<any>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingComponent ],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        {
          provide: ActivatedRoute,
          useValue: { 
            snapshot: {
              params: of({id: 123})
            }
          }
        },
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj({
            open: jasmine.createSpyObj({
              afterClosed: of('your result')
            })
          })
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

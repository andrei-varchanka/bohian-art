import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { UserComponent } from './user.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let initialState = {};
  let actions: Observable<any>;
  const mockSnackbarMock = jasmine.createSpyObj(['open']);
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({ id: 123 })
            }
          }
        },
        { provide: MatSnackBar, useValue: mockSnackbarMock },
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
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { PaintingEditorComponent } from './painting-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('PaintingEditorComponent', () => {
  let component: PaintingEditorComponent;
  let fixture: ComponentFixture<PaintingEditorComponent>;
  const initialState = {};
  let actions: Observable<any>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingEditorComponent ],
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
              params: of({id: 123})
            }
          }
        }
      ]
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

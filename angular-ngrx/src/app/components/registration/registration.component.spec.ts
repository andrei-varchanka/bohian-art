import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RegistrationComponent } from './registration.component';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/state/app.state';
import { createUserAction, createUserSuccessAction } from 'src/app/store/actions/user.actions';
import { User } from 'src/app/api/models';
import { setAuthTokenAction, setCurrentUserAction } from 'src/app/store/actions/system.actions';
import { ActionsSubject } from '@ngrx/store';
import { ChangeDetectorRef } from '@angular/core';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let initialState = {};
  let store: MockStore<AppState>;
  let actionSub;
  const formValue = {
    email: 'varch13@yandex.ru',
    password: 'QWErty123!',
    confirm: 'QWErty123!',
    firstName: 'Andrei',
    lastName: 'Varchanka',
    phone: '37529871893'
  };

  const invalidFormValue = {
    email: 'varch13yandexru',
    password: '123',
    confirm: '1234',
    firstName: '11Andrei',
    lastName: '22Varchanka',
    phone: '123'
  };

  const user: User = {
    email: 'varch13@yandex.ru',
    password: 'QWErty123!',
    firstName: 'Andrei',
    lastName: 'Varchanka',
    phone: '37529871893',
    role: 'Artist'
  };

  const token = 'Bearer 889E15A70DFC70F854185C74C6BCFBDE89B8F098F5E3D2345B743DE1E5E86B97';

  beforeEach(waitForAsync(() => {
    actionSub = new ActionsSubject();
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActionsSubject, useValue: actionSub },
        FormBuilder
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('register should dispatch createUserAction for valid form', () => {
    component.form.patchValue(formValue);
    component.register();
    expect(store.dispatch).toHaveBeenCalledWith(
      createUserAction({
        user: {
          email: formValue.email,
          password: formValue.password,
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          role: 'Artist',
          phone: formValue.phone
        }
      })
    );
  });

  it('register shouldn\'t dispatch createUserAction for invalid form', () => {
    component.register();
    expect(store.dispatch).not.toHaveBeenCalledWith(createUserAction({ user: user }));
  });

  it('subscribeOnRegister should dispatch setCurrentUserAction and setAuthTokenAction on createUserSuccessAction', () => {
    const actionSubject = TestBed.get(ActionsSubject) as ActionsSubject;
    actionSubject.next(createUserSuccessAction({ token: '123', user: user }));
    expect(store.dispatch).toHaveBeenCalledWith(setCurrentUserAction({ user: user }));
  });

  it('getErrorMessage should show appropriate message', () => {
    const matErrors = fixture.nativeElement.querySelectorAll('mat-error');
    expect(matErrors[0].textContent).toEqual('You need to enter your first name');
    expect(matErrors[1].textContent).toEqual('You need to enter your last name');
    expect(matErrors[3].textContent).toEqual('You need to enter your email');
    expect(matErrors[4].textContent).toEqual('You need to enter your password');
    expect(matErrors[5].textContent).toEqual('You need to enter your password confirmation');
    component.form.patchValue(invalidFormValue);
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    expect(matErrors[3].textContent).toEqual('Please enter a valid email');
    expect(matErrors[4].textContent).toEqual('Minimum of 6 characters, with an uppercase, lowercase, numeric and non-alphanumeric character');
    expect(matErrors[5].textContent).toEqual('Please enter a matching password');
  });
});

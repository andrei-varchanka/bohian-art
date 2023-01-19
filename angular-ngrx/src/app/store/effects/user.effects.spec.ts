
// jasmine marbles
// Hot observables will publish data regardless of if any observer has subscribed. Cold observables will only publish when at least one observer is registered.
// “-” is 10 frames, for indicating time has passed

import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable, of, throwError } from "rxjs";
import { User, UsersResponse } from "src/app/api/models";
import { UsersService } from "src/app/api/services";
import { getUsersAction, getUsersSuccessAction, getUserAction, getUserSuccessAction, getUsersErrorAction, getUserErrorAction, createUserAction, createUserSuccessAction, createUserErrorAction, authSuccessAction, authAction, authErrorAction, updateUserSuccessAction, updateUserAction, updateUserErrorAction, deleteUserSuccessAction, deleteUserAction, deleteUserErrorAction, changePasswordSuccessAction, changePasswordAction, changePasswordErrorAction } from "../actions/user.actions";
import { UserEffects } from "./user.effects";

// https://ngrx.io/guide/effects/testing


const USERS: User[] = [
  {
    email: "varch55@gmail.com",
    password: "$2b$10$SoSlVQRBDS/kP80rhB8ZlucBn7vuGnWujh4c5hT00Ji7pifHr2piS",
    firstName: "andrew",
    lastName: "varch2",
    role: "Admin",
    phone: "123",
    id: "5efb9e802d9a2f3144c0bc9e"
  },
  {
    email: "varch11@gmail.com",
    password: "$2b$10$DsWaH5zgKpOF4IvBnIrH2OJG6IUrTTrsvZMyHfr2QNJGc1ZfHU7fe",
    firstName: "test",
    lastName: "works!",
    role: "Artist",
    phone: "12345",
    id: "5efbb163d46bb14bd8783504"
  }
];

const TOKEN = 'Bearer 889E15A70DFC70F854185C74C6BCFBDE89B8F098F5E3D2345B743DE1E5E86B97';


describe('User effects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userService: jasmine.SpyObj<UsersService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        // An Effect subscribes to the Actions Observable to perform side effects. provideMockActions provides a mock provider of the Actions Observable to subscribe to
        provideMockActions(() => actions$),
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jasmine.createSpy(),
            getUser: jasmine.createSpy(),
            createUser: jasmine.createSpy(),
            auth: jasmine.createSpy(),
            updateUser: jasmine.createSpy(),
            deleteUser: jasmine.createSpy(),
            changePassword: jasmine.createSpy()
          }
        }
      ]
    });
    effects = TestBed.get(UserEffects);
    userService = TestBed.get(UsersService);
  });

  describe('Auth effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: authAction({ email: USERS[0].email, password: USERS[0].password }) });

      const response = cold('-b|', { b: { user: USERS[0], errorMessage: '', success: true, token: TOKEN } });
      userService.auth.and.returnValue(response);

      const expected = cold('--c', { c: authSuccessAction({ user: USERS[0], token: TOKEN }) });
      expect(effects.auth$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: authAction({ email: USERS[0].email, password: USERS[0].password }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      userService.auth.and.returnValue(response);

      const expected = cold('--b', { b: authErrorAction({ error: error }) });

      expect(effects.auth$).toBeObservable(expected);
    });
  });

  describe('Create user effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: createUserAction({ user: USERS[0] }) });

      const response = cold('-b|', { b: { user: USERS[0], errorMessage: '', success: true, token: TOKEN } });
      userService.createUser.and.returnValue(response);

      const expected = cold('--c', { c: createUserSuccessAction({ user: USERS[0], token: TOKEN }) });
      expect(effects.createUser$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: createUserAction({ user: USERS[0] }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      userService.createUser.and.returnValue(response);

      const expected = cold('--b', { b: createUserErrorAction({ error: error }) });

      expect(effects.createUser$).toBeObservable(expected);
    });
  });

  describe('Get user effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: getUserAction({ userId: USERS[0].id }) });

      const response = cold('-b|', { b: { user: USERS[0], errorMessage: '', success: true } });
      userService.getUser.and.returnValue(response);

      const expected = cold('--c', { c: getUserSuccessAction({ user: USERS[0] }) });
      expect(effects.getUser$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: getUserAction({ userId: USERS[0].id }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      userService.getUser.and.returnValue(response);

      const expected = cold('--b', { b: getUserErrorAction({ error: error }) });

      expect(effects.getUser$).toBeObservable(expected);
    });
  });

  describe('Get users effect', () => {
    it('should return a success action', () => {
      // we use hot() because before the test begins actions could already be getting dispatched
      actions$ = hot('-a', { a: getUsersAction() }); // getUsersAction triggers after 10 frames

      // getAllUsers response is specified as a cold observable because it should only run when the test is calling it. 
      const response = cold('-b|', { b: { users: USERS, errorMessage: '', success: true } });
      userService.getAllUsers.and.returnValue(response);

      // it is waiting for 10+10=20 frames and then returns a stream with the TodoItemsLoaded action.
      const expected = cold('--c', { c: getUsersSuccessAction({ users: USERS }) });
      expect(effects.getUsers$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: getUsersAction() });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      userService.getAllUsers.and.returnValue(response);

      const expected = cold('--b', { b: getUsersErrorAction({ error: error }) });

      expect(effects.getUsers$).toBeObservable(expected);
    });
  });

  describe('Update user effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: updateUserAction({ user: USERS[0] }) });

      const response = cold('-b|', { b: { user: USERS[0], errorMessage: '', success: true } });
      userService.updateUser.and.returnValue(response);

      const expected = cold('--c', { c: updateUserSuccessAction({ user: USERS[0] }) });
      expect(effects.updateUser$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: updateUserAction({ user: USERS[0] }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      userService.updateUser.and.returnValue(response);

      const expected = cold('--b', { b: updateUserErrorAction({ error: error }) });

      expect(effects.updateUser$).toBeObservable(expected);
    });
  });

  describe('Delete user effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: deleteUserAction({ userId: USERS[0].id }) });

      const response = cold('-b|', { b: { errorMessage: '', success: true } });
      userService.deleteUser.and.returnValue(response);

      const expected = cold('--c', { c: deleteUserSuccessAction({ userId: USERS[0].id }) });
      expect(effects.deleteUser$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: deleteUserAction({ userId: USERS[0].id }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      userService.deleteUser.and.returnValue(response);

      const expected = cold('--b', { b: deleteUserErrorAction({ error: error }) });

      expect(effects.deleteUser$).toBeObservable(expected);
    });
  });

  describe('Change password effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: changePasswordAction({ userId: USERS[0].id, password: USERS[0].password }) });

      const response = cold('-b|', { b: { user: USERS[0], errorMessage: '', success: true } });
      userService.changePassword.and.returnValue(response);

      const expected = cold('--c', { c: changePasswordSuccessAction({ user: USERS[0] }) });
      expect(effects.changePassword$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: changePasswordAction({ userId: USERS[0].id, password: USERS[0].password }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      userService.changePassword.and.returnValue(response);

      const expected = cold('--b', { b: changePasswordErrorAction({ error: error }) });

      expect(effects.changePassword$).toBeObservable(expected);
    });
  });

});




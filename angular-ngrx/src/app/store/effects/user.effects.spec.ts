
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
import { getUsersAction, getUsersSuccessAction, getUserAction, getUserSuccessAction, getUsersErrorAction } from "../actions/user.actions";
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

// getUsers$ = createEffect(() => this.actions$
//     .pipe(
//       ofType(UserActions.GET_USERS),
//       mergeMap(() => this.userService.getAllUsers()
//         .pipe(
//           map(response => getUsersSuccessAction({ users: response.users })),
//           catchError((err) => of(getUsersErrorAction(err)))
//         )
//       )
//     )
//   );

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
            getUser: jasmine.createSpy()
          }
        }
      ]
    });
    effects = TestBed.get(UserEffects);
    userService = TestBed.get(UsersService);
  });

  describe('Get users effect', () => {
    it('should return a stream with getUsersSuccessAction', () => {
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

      const expected = cold('--b', { b: getUsersErrorAction({error: error}) });

      expect(effects.getUsers$).toBeObservable(expected);
    });
  });

  // describe('Get user effect', () => {
  //   it('should return a stream with getUsersSuccessAction', () => {
  //     const response = of({ user: USERS[0], errorMessage: '', success: true });
  //     userService.getUser.and.returnValue(response);

  //     const source = cold('a', { a: getUserAction({userId: USERS[0].id}) });
  //     const effects = new UserEffects(userService, new Actions(source));
  //     const expected = cold('a', { a: getUserSuccessAction({ user: USERS[0] }) });

  //     expect(effects.getUsers$).toBeObservable(expected);
  //   });
  // });
});




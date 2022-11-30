
import { User } from "src/app/api/models";
import { authAction, authErrorAction, authSuccessAction, changePasswordAction, changePasswordErrorAction, changePasswordSuccessAction, createUserAction, createUserErrorAction, createUserSuccessAction, deleteUserAction, deleteUserErrorAction, deleteUserSuccessAction, getUserAction, getUserErrorAction, getUsersAction, getUsersErrorAction, getUsersSuccessAction, getUserSuccessAction, updateUserAction, updateUserErrorAction, updateUserSuccessAction, UserActions } from "../actions/user.actions";
import { UserState } from "../state/user.state";
import { userReducer } from "./user.reducer";

let state: UserState = {
  users: null,
  selectedUser: null,
  action: null,
  done: true,
  error: null,
};

const MOCK_DATA: User[] = [
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

const token = 'Bearer 889E15A70DFC70F854185C74C6BCFBDE89B8F098F5E3D2345B743DE1E5E86B97';

describe('Auth reducer', () => {

  it('should reduce the action AUTH', () => {
      const action = authAction({email: MOCK_DATA[0].email, password: MOCK_DATA[0].password});
      const newState = userReducer(state, action);
      expect({ ...newState }).toEqual({...state, action: UserActions.AUTH, done: false, error: null});
  });

  it('should reduce the action AUTH_SUCCESS', () => {
      const payload = {users: MOCK_DATA};
      const action = authSuccessAction({token: token, user: MOCK_DATA[0]});
      const newState = userReducer(state, action);
      expect({ ...newState }).toEqual({...state, done: true});
  });

  it('should reduce the action AUTH_ERROR', () => {
      const payload = new Error('Auth error');
      const action = authErrorAction({error: payload});
      const newState = userReducer(state, action);
      expect({ ...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('Create user reducer', () => {
  it('should reduce the action CREATE_USER', () => {
      const action = createUserAction({user: MOCK_DATA[0]});
      const newState = userReducer(state, action);
      expect({...newState}).toEqual({...state, action: UserActions.CREATE_USER, done: false, error: null});
  });
  it('should reduce the action CREATE_USER_SUCCESS', () => {
      const action = createUserSuccessAction({token: token, user: MOCK_DATA[0]});
      const newState = userReducer(state, action);
      expect({...newState}).toEqual({ ...state, done: true, users: state.users?.concat(MOCK_DATA[0])});
  });
  it('should reduce the action CREATE_USER_ERROR', () => {
      const payload = new Error('Create user error');
      const action = createUserErrorAction({error: payload});
      const newState = userReducer(state, action);
      expect({...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('Get users reducer', () => {

  it('should reduce the action GET_USERS', () => {
      const action = getUsersAction();
      const newState = userReducer(state, action);
      expect({ ...newState }).toEqual({...state, action: UserActions.GET_USERS, done: false, error: null});
  });

  it('should reduce the action GET_USERS_SUCCESS', () => {
      const payload = {users: MOCK_DATA};
      const action = getUsersSuccessAction(payload);
      const newState = userReducer(state, action);
      expect({ ...newState }).toEqual({...state, done: true, users: payload.users});
  });

  it('should reduce the action GET_USERS_ERROR', () => {
      const payload = new Error('Get users error');
      const action = getUsersErrorAction({error: payload});
      const newState = userReducer(state, action);
      expect({ ...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('GET user by id reducer', () => {
  it('should reduce the action GET_USER', () => {
      const payload = MOCK_DATA[0].id;
      const action = getUserAction({userId: payload});
      const newState = userReducer(state, action);
      expect({...newState}).toEqual({...state, action: UserActions.GET_USER, done: false, error: null});
  });
  it('should reduce the action GET_USER_SUCCESS', () => {
      const payload = MOCK_DATA[0];
      const action = getUserSuccessAction({user: payload});
      const newState = userReducer(state, action);
      expect({...newState}).toEqual({ ...state, done: true, selectedUser: payload});
  });
  it('should reduce the action GET_USER_ERROR', () => {
      const payload = new Error('Get user error');
      const action = getUserErrorAction({error: payload});
      const newState = userReducer(state, action);
      expect({...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('Delete user reducer', () => {
  it('should reduce the action DELETE_USER', () => {
      const action = deleteUserAction({userId: MOCK_DATA[0].id});
      const newState = userReducer(state, action);
      expect({...newState}).toEqual({...state, action: UserActions.DELETE_USER, done: false, error: null});
  });
  it('should reduce the action DELETE_USER_SUCCESS', () => {
      const action = deleteUserSuccessAction({userId: MOCK_DATA[0].id});
      const newState = userReducer(state, action);
      expect({...newState}).toEqual({ ...state, done: true, users: state.users?.filter(u => u.id != MOCK_DATA[0].id), selectedUser: null});
  });
  it('should reduce the action DELETE_USER_ERROR', () => {
      const payload = new Error('Delete user error');
      const action = deleteUserErrorAction({error: payload});
      const newState = userReducer(state, action);
      expect({...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('Update user reducer', () => {
  it('should reduce the action UPDATE_USER', () => {
      const action = updateUserAction({user: MOCK_DATA[0]});
      const newState = userReducer(state, action);
      expect({...newState}).toEqual({...state, action: UserActions.UPDATE_USER, done: false, error: null, selectedUser: MOCK_DATA[0]});
  });
  it('should reduce the action UPDATE_USER_SUCCESS', () => {
      const action = updateUserSuccessAction({user: MOCK_DATA[0]});
      const newState = userReducer(state, action);
      const index = state.users?.findIndex(user => user.id === state.selectedUser.id);
      expect({...newState}).toEqual({ ...state, done: true, users: index && state.users ? [...state.users.slice(0, index), state.selectedUser, ...state.users.slice(index + 1)] : null});
  });
  it('should reduce the action UPDATE_USER_ERROR', () => {
      const payload = new Error('Update user error');
      const action = updateUserErrorAction({error: payload});
      const newState = userReducer(state, action);
      expect({...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('Change password reducer', () => {
  it('should reduce the action CHANGE_PASSWORD', () => {
      const action = changePasswordAction({userId: MOCK_DATA[0].id, password: MOCK_DATA[0].password});
      const newState = userReducer(state, action);
      expect({...newState}).toEqual({...state, action: UserActions.CHANGE_PASSWORD, done: false, error: null});
  });
  it('should reduce the action CHANGE_PASSWORD_SUCCESS', () => {
      const action = changePasswordSuccessAction({ user: MOCK_DATA[0]});
      const newState = userReducer(state, action);
      expect({...newState}).toEqual({ ...state, done: true});
  });
  it('should reduce the action CHANGE_PASSWORD_ERROR', () => {
      const payload = new Error('Change password error');
      const action = changePasswordErrorAction({error: payload});
      const newState = userReducer(state, action);
      expect({...newState }).toEqual({...state, done: true, error: payload});
  });
});
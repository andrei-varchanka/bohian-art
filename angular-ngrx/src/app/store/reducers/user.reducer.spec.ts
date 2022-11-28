
import { User } from "src/app/api/models";
import { getUserAction, getUsersAction, getUsersErrorAction, getUsersSuccessAction, getUserSuccessAction, UserActions } from "../actions/user.actions";
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
      const payload = new Error('Error loading users');
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
      const payload = new Error('Error loading the user');
      const action = getUsersErrorAction({error: payload});
      const newState = userReducer(state, action);
      expect({...newState }).toEqual({...state, done: true, error: payload});
  });
});

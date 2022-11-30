import { User } from "src/app/api/models";
import { setAuthTokenAction, setCurrentUserAction } from "../actions/system.actions";
import { SystemState } from "../state/system.state";
import { systemReducer } from "./system.reducer";

const state: SystemState = {
  currentUser: null,
  token: null
};

const MOCK_USER: User = {
  email: "varch55@gmail.com",
  password: "$2b$10$SoSlVQRBDS/kP80rhB8ZlucBn7vuGnWujh4c5hT00Ji7pifHr2piS",
  firstName: "andrew",
  lastName: "varch2",
  role: "Admin",
  phone: "123",
  id: "5efb9e802d9a2f3144c0bc9e"
};

const token = 'Bearer 889E15A70DFC70F854185C74C6BCFBDE89B8F098F5E3D2345B743DE1E5E86B97';

describe('System reducer', () => {

  it('should reduce the action SET_CURRENT_USER', () => {
    const action = setCurrentUserAction({ user: MOCK_USER });
    const newState = systemReducer(state, action);
    expect({ ...newState }).toEqual({ ...state, currentUser: MOCK_USER });
  });


  it('should reduce the action SET_AUTH_TOKEN', () => {
    const action = setAuthTokenAction({ token });
    const newState = systemReducer(state, action);
    expect({ ...newState }).toEqual({ ...state, token });
  });

});
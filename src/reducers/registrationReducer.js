import { userConstants } from '../constants/users';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registered: false };
    case userConstants.REGISTER_SUCCESS:
      return { registerSuccess: true };
    case userConstants.REGISTER_FAILURE:
      return {
        registerFailed: false,
        error: action.error === "Conflict" ? "Username is already exists" : "Something went wrong with the server!"
      };
    default:
      return state
  }
}

import { userConstants } from '../constants/users';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:

      return {
        registerFailed: true,
        error: action.error === "Conflict" ? "Username is already exists" : action.error
      };
    default:
      return state
  }
}

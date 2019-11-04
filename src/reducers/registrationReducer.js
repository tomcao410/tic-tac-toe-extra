import { userConstants } from '../constants/users';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registered: false };
    case userConstants.REGISTER_SUCCESS:
      return { registered: true };
    case userConstants.REGISTER_FAILURE:
      return {
        registered: false,
        error: action.error === "Conflict" ? "Username is already exists" : action.error
      };
    default:
      return state
  }
}

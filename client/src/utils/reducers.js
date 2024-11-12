import {
  SET_USERS
} from "./actions";
import {
  SET_USER
} from "./actions";
import {
  SET_TRIPS 
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
        return {
            ...state,
            users: action.payload
      }
    case SET_USER:
        return {
            ...state,
            userId: action.userId
        }
    case SET_TRIPS:
        return {
            ...state,
            trips: action.payload,
        }
    default:
      return state;
  }
};

import {
  START_ENIGMA_SESSION,
  START_ENIGMA_SESSION_SUCCESS,
  START_ENIGMA_SESSION_ERROR,
} from './actions'

// REDUCER
const initialState = { app: null, loading: true, success: false }
export default function fetchQlikAppReducer(state = initialState, action) {
  switch (action.type) {
    case START_ENIGMA_SESSION:
      return state
    case START_ENIGMA_SESSION_SUCCESS:
      return { ...state, app: action.payload, loading: false, success: true }
    case START_ENIGMA_SESSION_ERROR:
      return { ...state, app: action.payload, loading: false, success: false }
    default:
      return state
  }
}

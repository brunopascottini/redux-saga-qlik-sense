import {
  SAVE_SELECTION_START,
  SAVE_SELECTION_END,
  UPDATE_SELECTED_VALUES,
  SET_COMPUTING,
} from './actions'

// REDUCER
const initialState = {
  isSelecting: false,
  selectedModelId: null,
  selectedModelType: null,
  values: [],
  engineComputing: false,
}

export default function selectionsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SELECTION_START:
      const { id, type, values } = action.payload
      return {
        ...state,
        isSelecting: true,
        selectedModelId: id,
        selectedModelType: type,
        values: values || [],
      }
    case SAVE_SELECTION_END:
      return {
        ...state,
        isSelecting: false,
        selectedModelId: null,
        selectedModelType: null,
        values: [],
      }
    case UPDATE_SELECTED_VALUES:
      return { ...state, values: action.payload }
    case SET_COMPUTING:
      return { ...state, engineComputing: action.payload }
    default:
      return state
  }
}

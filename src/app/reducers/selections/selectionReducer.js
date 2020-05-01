import { SELECT_VALUE, END_SELECTIONS } from './actions'

// REDUCER
const initialState = {
  isSelecting: false,
  modelSelecting: null,
  values: [],
}

export default function selectionsReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_VALUE:
      const { value: actionValue, modelId } = action.payload
      let stateValues
      state.modelSelecting === modelId ? (stateValues = state.values) : (stateValues = [])
      const index = stateValues.indexOf(actionValue)
      index < 0 ? stateValues.push(actionValue) : stateValues.splice(index, 1)
      return stateValues.length === 0
        ? { ...state, isSelecting: false, modelSelecting: null, values: [] }
        : { ...state, isSelecting: true, modelSelecting: modelId, values: stateValues }
    case END_SELECTIONS:
      return { ...state, isSelecting: false, modelSelecting: null }
    default:
      return state
  }
}

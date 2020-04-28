export const SAVE_SELECTION_START = 'SAVE_SELECTION_START'
export const SAVE_SELECTION_END = 'SAVE_SELECTION_END'
export const UPDATE_SELECTED_VALUES = 'UPDATE_SELECTED_VALUES'
export const SET_COMPUTING = 'SET_COMPUTING'

// ACTIONS
export const saveSelectionStart = (id, type, values) => ({
  type: SAVE_SELECTION_START,
  payload: { id, type, values },
})
export const saveSelectionEnd = (id, type, values) => ({
  type: SAVE_SELECTION_END,
  payload: { id, type, values },
})
export const updateSelectedValues = (isComputing) => ({
  type: UPDATE_SELECTED_VALUES,
  payload: isComputing,
})

export const SELECT_VALUE = 'SELECT_VALUE'
export const END_SELECTIONS = 'END_SELECTIONS'

// ACTIONS
export const selectValue = (value, modelId) => ({
  type: SELECT_VALUE,
  payload: { value, modelId },
})

export const endSelections = () => ({
  type: END_SELECTIONS,
  payload: {},
})

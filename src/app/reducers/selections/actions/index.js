export const SELECT_VALUE = 'SELECT_VALUE'
export const END_SELECTIONS = 'END_SELECTIONS'
export const CLEAR_SELECTIONS = 'CLEAR_SELECTIONS'

// ACTIONS
export const selectValue = (value, model) => ({
  type: SELECT_VALUE,
  payload: { value, model },
})

export const endSelections = (model, chartId) => ({
  type: END_SELECTIONS,
  payload: {
    model,
    chartId,
  },
})

export const clearSelections = () => ({
  type: CLEAR_SELECTIONS,
})

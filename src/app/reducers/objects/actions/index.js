export const GET_QLIK_OBJECT_FOR_CHART = 'GET_QLIK_OBJECT_FOR_CHART'
export const GET_QLIK_OBJECT_FOR_CHART_SUCCESS = 'GET_QLIK_OBJECT_FOR_CHART_SUCCESS'
export const GET_QLIK_OBJECT_FOR_CHART_ERROR = 'GET_QLIK_OBJECT_FOR_CHART_ERROR'
export const CREATE_QLIK_OBJECT_FOR_CHART = 'CREATE_QLIK_OBJECT_FOR_CHART'
export const CREATE_QLIK_OBJECT_FOR_CHART_SUCCESS = 'CREATE_QLIK_OBJECT_FOR_CHART_SUCCESS'
export const CREATE_QLIK_OBJECT_FOR_CHART_ERROR = 'CREATE_QLIK_OBJECT_FOR_CHART_ERROR'
export const REMOVE_QLIK_OBJECT_FOR_CHART = 'REMOVE_QLIK_OBJECT_FOR_CHART'
export const UPDATE_QLIK_OBJECT_ON_SELECTION = 'UPDATE_QLIK_OBJECT_ON_SELECTION'
// ACTIONS
export const removeQlikObjectForChart = (chartId) => ({
  type: REMOVE_QLIK_OBJECT_FOR_CHART,
  payload: { chartId },
})

export const getQlikObjectForChart = (id, chartId) => ({
  type: GET_QLIK_OBJECT_FOR_CHART,
  payload: { id, chartId },
})

export const getQlikObjectForChartSuccess = (chartId, model, newLayout, newData, newChartType) => ({
  type: GET_QLIK_OBJECT_FOR_CHART_SUCCESS,
  payload: {
    chartId,
    model,
    layout: newLayout,
    data: [...newData],
    chartType: newChartType,
  },
})

export const getQlikObjectForChartError = (error, chartId) => ({
  type: GET_QLIK_OBJECT_FOR_CHART_ERROR,
  payload: { chartId },
  error,
})

export const createObjectForChart = (type, def, propChartType, chartId) => ({
  type: CREATE_QLIK_OBJECT_FOR_CHART,
  payload: {
    chartId,
    type,
    def,
    propChartType,
  },
})

export const createObjectForChartSuccess = (chartId, model, layout, newData, newChartType) => ({
  type: CREATE_QLIK_OBJECT_FOR_CHART_SUCCESS,
  payload: {
    chartId,
    model,
    layout,
    data: [...newData],
    chartType: newChartType,
  },
})

export const createObjectForChartError = (chartId, error) => ({
  type: createObjectForChartError,
  payload: {
    chartId,
  },
  error,
})

export const updateQlikObjectOnSelection = (chartId, model, newLayout, newData) => ({
  type: UPDATE_QLIK_OBJECT_ON_SELECTION,
  payload: {
    chartId,
    model,
    layout: newLayout,
    data: [...newData],
  },
})

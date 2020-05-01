import {
  GET_QLIK_OBJECT_FOR_CHART,
  GET_QLIK_OBJECT_FOR_CHART_SUCCESS,
  GET_QLIK_OBJECT_FOR_CHART_ERROR,
  CREATE_QLIK_OBJECT_FOR_CHART,
  CREATE_QLIK_OBJECT_FOR_CHART_SUCCESS,
  CREATE_QLIK_OBJECT_FOR_CHART_ERROR,
  REMOVE_QLIK_OBJECT_FOR_CHART,
  UPDATE_QLIK_OBJECT_ON_SELECTION,
} from './actions'

// REDUCER
const initialState = {
  charts: {},
}

export default function qlikObjectsReducer(state = initialState, action) {
  let charts
  let newChart = {
    isLoading: true,
    model: undefined,
  }
  switch (action.type) {
    case GET_QLIK_OBJECT_FOR_CHART:
      charts = Object.assign({}, state.charts)
      charts[action.payload.chartId] = newChart
      return { charts }
    case GET_QLIK_OBJECT_FOR_CHART_SUCCESS:
      charts = Object.assign({}, state.charts)
      charts[action.payload.chartId].isLoading = false
      charts[action.payload.chartId].model = action.payload.model
      charts[action.payload.chartId].layout = action.payload.layout
      charts[action.payload.chartId].data = action.payload.data
      charts[action.payload.chartId].chartType = action.payload.chartType
      return { charts }
    case GET_QLIK_OBJECT_FOR_CHART_ERROR:
      return state
    case CREATE_QLIK_OBJECT_FOR_CHART:
      charts = Object.assign({}, state.charts)
      charts[action.payload.chartId] = newChart
      return { charts }
    case CREATE_QLIK_OBJECT_FOR_CHART_SUCCESS:
      charts = Object.assign({}, state.charts)
      charts[action.payload.chartId].isLoading = false
      charts[action.payload.chartId].model = action.payload.model
      charts[action.payload.chartId].layout = action.payload.layout
      charts[action.payload.chartId].data = action.payload.data
      charts[action.payload.chartId].chartType = action.payload.chartType
      return { charts }
    case CREATE_QLIK_OBJECT_FOR_CHART_ERROR:
      return state
    case REMOVE_QLIK_OBJECT_FOR_CHART:
      charts = Object.assign({}, state)
      delete charts.charts[action.payload.chartId]
      return charts
    case UPDATE_QLIK_OBJECT_ON_SELECTION:
      charts = Object.assign({}, state.charts)
      charts[action.payload.chartId].isLoading = false
      // charts[action.payload.chartId].model = action.payload.model
      charts[action.payload.chartId].layout = action.payload.layout
      charts[action.payload.chartId].data = action.payload.data

      return { charts }
    default:
      return state
  }
}

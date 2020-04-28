import Chart from './Chart.jsx'
import { connect } from 'react-redux'
import {
  getQlikObjectForChart,
  createObjectForChart,
  removeQlikObjectForChart,
} from '../../../reducers/objects/actions'

const mapStateToProps = function (state, props) {
  if (!state.qlikObjects.charts[props.chartId]) {
    return { isLoading: true }
  }
  return {
    isLoading: state.qlikObjects.charts[props.chartId].isLoading,
    model: state.qlikObjects.charts[props.chartId].model,
    layout: state.qlikObjects.charts[props.chartId].layout,
    data: state.qlikObjects.charts[props.chartId].data,
    type: state.qlikObjects.charts[props.chartId].chartType,
    theme: state.theme,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getObjectForChartId: (id, chartId) => dispatch(getQlikObjectForChart(id, chartId)),
  createObjectForChartId: (type, def, propChartType, chartId) =>
    dispatch(createObjectForChart(type, def, propChartType, chartId)),
  removeQlikObjectForChart: (chartId) => dispatch(removeQlikObjectForChart(chartId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chart)

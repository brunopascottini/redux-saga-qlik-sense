import * as objectsActionsAndTypes from '../app/reducers/objects/actions'
import * as selectionsActionsAndTypes from '../app/reducers/selections/actions'

describe('Object Action Creators', () => {
  it('Should create an action to get a Qlik Object', () => {
    const id = 'randomId'
    const chartId = 'randomChartId'
    const expectedAction = {
      type: objectsActionsAndTypes.GET_QLIK_OBJECT_FOR_CHART,
      payload: { id, chartId },
    }
    expect(objectsActionsAndTypes.getQlikObjectForChart(id, chartId)).toEqual(expectedAction)
  })
  it('Should create an action to create a Qlik Object', () => {
    const type = 'cube'
    const def = { qInfo: 'anything' }
    const propChartType = 'piechart'
    const chartId = 'randomChartId'
    const expectedAction = {
      type: objectsActionsAndTypes.CREATE_QLIK_OBJECT_FOR_CHART,
      payload: {
        chartId,
        type,
        def,
        propChartType,
      },
    }
    expect(objectsActionsAndTypes.createObjectForChart(type, def, propChartType, chartId)).toEqual(
      expectedAction
    )
  })
})

describe('Selection Action Creators', () => {
  it('Should create an action to perform a selection in a chart', () => {
    const value = 0
    const model = { anyProperty: () => console.log(value) }
    const expectedAction = {
      type: selectionsActionsAndTypes.SELECT_VALUE,
      payload: { value, model },
    }
    expect(selectionsActionsAndTypes.selectValue(value, model)).toEqual(expectedAction)
  })
})

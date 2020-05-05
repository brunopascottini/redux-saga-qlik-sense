import * as objectsActionsAndTypes from '../app/reducers/objects/actions'
import qlikObjectsReducer from '../app/reducers/objects/qlikObjectsReducer'

import * as selectionsActionsAndTypes from '../app/reducers/selections/actions'
import selectionsReducer from '../app/reducers/selections/selectionReducer'

describe('Objects Reducer', () => {
  it('Action default', () => {
    expect(qlikObjectsReducer({ charts: {} }, {})).toEqual({ charts: {} })
  })
  it('Action GET_QLIK_OBJECT_FOR_CHART_SUCCESS', () => {
    expect(
      qlikObjectsReducer(
        { charts: { abc: { isLoading: true } } },
        {
          type: objectsActionsAndTypes.GET_QLIK_OBJECT_FOR_CHART_SUCCESS,
          payload: { chartId: 'abc', model: {}, layout: {}, data: [{}], chartType: 'barchart' },
        }
      )
    ).toEqual({
      charts: {
        abc: { model: {}, layout: {}, data: [{}], chartType: 'barchart', isLoading: false },
      },
    })
  })
  it('Action REMOVE_QLIK_OBJECT_FOR_CHART', () => {
    expect(
      qlikObjectsReducer(
        {
          charts: {
            'cd0e9608-a6ad-4be3-8d34-1c0d10e5a076': {
              model: {},
              layout: {},
              data: [{}],
              chartType: 'barchart',
              isLoading: false,
            },
            '23a98c12-c724-40c2-9a7c-033d9ee822c7': {
              model: {},
              layout: {},
              data: [{}],
              chartType: 'piechart',
              isLoading: false,
            },
          },
        },
        {
          type: objectsActionsAndTypes.REMOVE_QLIK_OBJECT_FOR_CHART,
          payload: { chartId: '23a98c12-c724-40c2-9a7c-033d9ee822c7' },
        }
      )
    ).toEqual({
      charts: {
        'cd0e9608-a6ad-4be3-8d34-1c0d10e5a076': {
          model: {},
          layout: {},
          data: [{}],
          chartType: 'barchart',
          isLoading: false,
        },
      },
    })
  })
  it('Action UPDATE_QLIK_OBJECT_ON_SELECTION', () => {
    expect(
      qlikObjectsReducer(
        {
          charts: {
            'cd0e9608-a6ad-4be3-8d34-1c0d10e5a076': {
              model: {},
              layout: {},
              data: [{}],
              chartType: 'barchart',
              isLoading: false,
            },
          },
        },
        {
          type: objectsActionsAndTypes.UPDATE_QLIK_OBJECT_ON_SELECTION,
          payload: {
            chartId: 'cd0e9608-a6ad-4be3-8d34-1c0d10e5a076',
            layout: { newLayout: 1 },
            data: [{ newData: 1 }],
          },
        }
      )
    ).toEqual({
      charts: {
        'cd0e9608-a6ad-4be3-8d34-1c0d10e5a076': {
          model: {},
          layout: { newLayout: 1 },
          data: [{ newData: 1 }],
          chartType: 'barchart',
          isLoading: false,
        },
      },
    })
  })
})

describe('Selections Reducer', () => {
  it('Action SELECT_VALUE 1', () => {
    expect(
      selectionsReducer(
        {
          isSelecting: false,
          modelSelecting: null,
          previousModelSelecting: null,
          values: [],
        },
        {
          type: selectionsActionsAndTypes.SELECT_VALUE,
          payload: { value: 1, model: { id: 'ABC123' } },
        }
      )
    ).toEqual({
      isSelecting: true,
      modelSelecting: 'ABC123',
      previousModelSelecting: null,
      values: [1],
    })
  })
  it('Action SELECT_VALUE 2', () => {
    expect(
      selectionsReducer(
        {
          isSelecting: true,
          modelSelecting: 'ABC123',
          previousModelSelecting: null,
          values: [1],
        },
        {
          type: selectionsActionsAndTypes.SELECT_VALUE,
          payload: { value: 2, model: { id: 'DEF456' } },
        }
      )
    ).toEqual({
      isSelecting: true,
      modelSelecting: 'DEF456',
      previousModelSelecting: 'ABC123',
      values: [2],
    })
  })
  it('Action END_SELECTIONS', () => {
    expect(
      selectionsReducer(
        {
          isSelecting: true,
          modelSelecting: 'ABC123',
          previousModelSelecting: null,
          values: [1],
        },
        {
          type: selectionsActionsAndTypes.END_SELECTIONS,
          payload: { model: { id: 'ABC123' }, chartId: 'randomChartId' },
        }
      )
    ).toEqual({
      isSelecting: false,
      modelSelecting: null,
      previousModelSelecting: 'ABC123',
      values: [1],
    })
  })
  it('Action CLEAR_SELECTIONS', () => {
    expect(
      selectionsReducer(
        {
          isSelecting: true,
          modelSelecting: 'ABC123',
          previousModelSelecting: null,
          values: [1],
        },
        {
          type: selectionsActionsAndTypes.CLEAR_SELECTIONS,
          payload: {},
        }
      )
    ).toEqual({
      isSelecting: false,
      modelSelecting: null,
      previousModelSelecting: 'ABC123',
      values: [],
    })
  })
})

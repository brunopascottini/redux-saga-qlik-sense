import { put, select, takeEvery } from 'redux-saga/effects'
import {
  getQlikObjectForChartSuccess,
  getQlikObjectForChartError,
  GET_QLIK_OBJECT_FOR_CHART,
  CREATE_QLIK_OBJECT_FOR_CHART,
  createObjectForChartSuccess,
  createObjectForChartError,
} from './actions'

import { updateLayout } from '../../utils/qlik/updateLayout'

const getLayout = async (model) => {
  const timer = () => new Promise((res) => setTimeout(res, 200))
  let layout
  while (!layout) {
    try {
      layout = await model.getLayout()
    } catch (err) {
      await timer()
    }
  }
  return layout
}

export function* getObjectForChartId(action) {
  const { id: objectId, chartId } = action.payload
  const getApp = (state) => state.qlik.app
  const app = yield select(getApp)

  // console.log(objectId)
  let model
  try {
    model = yield app.getObject(objectId)
  } catch (err) {
    console.log(err)
    throw new Error(`It was not possible to get the object with id: ${objectId}`)
  }
  let layout = yield model.getLayout()

  // layout.qInfo.qType === 'scattetplot' && layout.qHyperCube.qDataPages = model.getHyperCubeData()
  const props = yield model.getProperties()
  props.qHyperCubeDef.qInitialDataFetch = [
    {
      qTop: 0,
      qLeft: 0,
      qWidth: layout.qHyperCube.qSize.qcx,
      qHeight: layout.qHyperCube.qSize.qcy,
    },
  ]
  if (layout.qInfo.qType === 'scatterplot') {
    layout.qHyperCube.qDataPages = yield model.getHyperCubeData(
      '/qHyperCubeDef',
      props.qHyperCubeDef.qInitialDataFetch
    )
  }
  model.setProperties(props)
  const data = updateLayout(layout)
  try {
    yield put(getQlikObjectForChartSuccess(chartId, model, layout, data, layout.qInfo.qType))
  } catch (error) {
    yield put(getQlikObjectForChartError(error))
  }
}

export function* createObjectForChart(action) {
  const { chartId: id, def, propChartType, type } = action.payload

  const getApp = (state) => state.qlik.app
  const app = yield select(getApp)

  let qType, key, objDef
  switch (type) {
    case 'cube':
      qType = 'qHyperCube'
      key = 'qHyperCubeDef'
      break
    case 'list':
      qType = 'qSelectionList'
      key = 'qSelectionListDef'
      break
    case 'selections':
      qType = 'CurrentSelections'
      key = 'qSelectionObjectDef'
      break
    default:
      qType = null
      key = null
      break
  }

  if (qType && key) {
    objDef = {
      qInfo: { qType: qType },
      [key]: def, // These square brackets are ES6 feature to set object property named as a variable
    }
  }
  let chartModel
  yield app.createSessionObject(objDef).then((model) => (chartModel = model))
  const layout = yield getLayout(chartModel)
  const data = updateLayout(layout)
  try {
    yield put(createObjectForChartSuccess(id, chartModel, layout, data, propChartType))
  } catch (err) {
    yield put(createObjectForChartError(id, err))
  }
}

export function* qlikObjectSaga() {
  yield takeEvery(GET_QLIK_OBJECT_FOR_CHART, getObjectForChartId)
  yield takeEvery(CREATE_QLIK_OBJECT_FOR_CHART, createObjectForChart)
}

export function* qlikObjectLayoutSaga() {
  yield takeEvery()
}

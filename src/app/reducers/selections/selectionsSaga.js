import { updateLayout } from '../../utils/qlik/updateLayout'
import { put, select, takeEvery } from 'redux-saga/effects'
import { SELECT_VALUE, END_SELECTIONS, CLEAR_SELECTIONS } from './actions'
import { updateQlikObjectOnSelection } from '../objects/actions'

export function* evalutateSelection(action) {
  const { value, model } = action.payload

  const getApp = (state) => state.qlik.app
  const app = yield select(getApp)
  const getSelections = (state) => state.selections
  const selectionsState = yield select(getSelections)
  const getObjects = (state) => state.qlikObjects.charts
  const objectsState = yield select(getObjects)

  //   console.log('modelId', model.id)
  //   console.log('selecting model', selectionsState.modelSelecting)
  if (
    model.id !== selectionsState.previousModelSelecting &&
    selectionsState.previousModelSelecting !== null
  ) {
    const previousModel = yield app.getObject(selectionsState.previousModelSelecting)
    yield previousModel.endSelections(true)
  }

  //   console.log('selections length', selectionsState.values.length)
  const toggle = selectionsState.values.length > 0 ? true : false
  const chartIds = Object.keys(objectsState)

  if (selectionsState.values.length !== 0) {
    yield model.beginSelections(['/qHyperCubeDef'])
    yield model.selectHyperCubeValues('/qHyperCubeDef', 0, [value], toggle)
    for (const chartId of chartIds) {
      let model = yield app.getObject(objectsState[chartId].model.id)
      const layout = yield model.getLayout()
      const data = updateLayout(layout)
      // const chartType = objectsState[chartId].chartType
      yield put(updateQlikObjectOnSelection(chartId, model, layout, data))
    }
  } else {
    yield model.endSelections(false)
    yield app.clearAll(true)
    for (const chartId of chartIds) {
      let model = yield app.getObject(objectsState[chartId].model.id)
      const layout = yield model.getLayout()
      const data = updateLayout(layout)
      // const chartType = objectsState[chartId].chartType
      yield put(updateQlikObjectOnSelection(chartId, model, layout, data))
    }
  }
}

export function* endSelections(action) {
  const { model, chartId } = action.payload
  const layout = yield model.getLayout()
  const data = updateLayout(layout)
  yield put(updateQlikObjectOnSelection(chartId, model, layout, data))
}
export function* clearSelections() {
  const getApp = (state) => state.qlik.app
  const app = yield select(getApp)
  const getObjects = (state) => state.qlikObjects.charts
  const objectsState = yield select(getObjects)
  const chartIds = Object.keys(objectsState)
  for (const chartId of chartIds) {
    let model = yield app.getObject(objectsState[chartId].model.id)
    const layout = yield model.getLayout()
    const data = updateLayout(layout)
    yield put(updateQlikObjectOnSelection(chartId, model, layout, data))
  }
}

export function* selectionsSaga() {
  yield takeEvery(SELECT_VALUE, evalutateSelection)
  yield takeEvery(END_SELECTIONS, endSelections)
  yield takeEvery(CLEAR_SELECTIONS, clearSelections)
}

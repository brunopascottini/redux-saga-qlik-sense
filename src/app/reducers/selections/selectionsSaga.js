import { updateLayout } from '../../utils/qlik/updateLayout'
import { put, select, takeEvery } from 'redux-saga/effects'
import { SELECT_VALUE, END_SELECTIONS } from './actions'
import { updateQlikObjectOnSelection } from '../objects/actions'

export function* evalutateSelection(action) {
  const { value, modelId } = action.payload

  const getApp = (state) => state.qlik.app
  const app = yield select(getApp)
  const getSelections = (state) => state.selections
  const selectionsState = yield select(getSelections)
  const getObjects = (state) => state.qlikObjects.charts
  const objectsState = yield select(getObjects)

  const toggle = selectionsState.values.length > 0 ? true : false
  const chartIds = Object.keys(objectsState)

  console.log('Values in selections store', selectionsState.values)
  console.log('toggle value', toggle)
  let model = yield app.getObject(modelId)
  yield model.beginSelections(['/qHyperCubeDef'])
  yield model.selectHyperCubeValues('/qHyperCubeDef', 0, [value], toggle)
  //   yield model.endSelections(false)
  for (const chartId of chartIds) {
    let model = yield app.getObject(objectsState[chartId].model.id)
    const layout = yield model.getLayout()
    const data = updateLayout(layout)
    // const chartType = objectsState[chartId].chartType
    yield put(updateQlikObjectOnSelection(chartId, model, layout, data))
  }
}

// export function* endSelections(action) {
//   const getApp = (state) => state.qlik.app
//   const app = yield select(getApp)
//   const getObjects = (state) => state.qlikObjects.charts
//   const objectsState = yield select(getObjects)
//   const chartIds = Object.keys(objectsState)
//   for (const chartId of chartIds) {
//     let model = yield app.getObject(objectsState[chartId].model.id)
//     const layout = yield model.getLayout()
//     const data = updateLayout(layout)
//     // const chartType = objectsState[chartId].chartType
//     yield put(updateQlikObjectOnSelection(chartId, model, layout, data))
//   }
// }

export function* selectionsSaga() {
  yield takeEvery(SELECT_VALUE, evalutateSelection)
  //   yield takeEvery(END_SELECTIONS, endSelections)
}

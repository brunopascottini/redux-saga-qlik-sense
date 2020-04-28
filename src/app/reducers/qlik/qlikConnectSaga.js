import { openSession } from '../../utils/qlik/qlikConnectApp'
import { call, put, delay, takeEvery } from 'redux-saga/effects'
import {
  START_ENIGMA_SESSION_SUCCESS,
  START_ENIGMA_SESSION_ERROR,
  START_ENIGMA_SESSION,
} from './actions'

export function* connectEnigma() {
  yield delay(1500)
  const app = yield call(openSession)
  if (app) {
    yield put({ type: START_ENIGMA_SESSION_SUCCESS, payload: app })
  } else {
    yield put({ type: START_ENIGMA_SESSION_ERROR, payload: app })
  }
}

export function* connectAppSaga() {
  yield takeEvery(START_ENIGMA_SESSION, connectEnigma)
}

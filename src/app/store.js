import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import createSagaMiddleware from 'redux-saga'

import { composeWithDevTools } from 'redux-devtools-extension'
import loggerMiddleware from 'redux-logger'
import { connectAppSaga } from './reducers/qlik/qlikConnectSaga'
import { qlikObjectSaga } from './reducers/objects/qlikObjectsSaga'
import { selectionsSaga } from './reducers/selections/selectionsSaga'

import { startEnigmaSession } from './reducers/qlik/actions'
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(loggerMiddleware, sagaMiddleware))
)

sagaMiddleware.run(connectAppSaga)
sagaMiddleware.run(qlikObjectSaga)
sagaMiddleware.run(selectionsSaga)

store.dispatch(startEnigmaSession())

export default store

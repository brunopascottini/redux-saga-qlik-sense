import { combineReducers } from 'redux'
import qlikReducer from './qlik/qlikConnectReducer'
import themeReducer from './theme/themeReducer'
import selelectionsReducer from './selections/selectionReducer'
import qlikObjectsReducer from './objects/qlikObjectsReducer'

export const rootReducer = combineReducers({
  qlik: qlikReducer,
  theme: themeReducer,
  selections: selelectionsReducer,
  qlikObjects: qlikObjectsReducer,
})

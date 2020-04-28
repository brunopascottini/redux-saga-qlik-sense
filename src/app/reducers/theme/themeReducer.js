import { themeList } from './themeData'
import { CHANGE_THEME } from './actions'

const initialState = themeList[0]

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      let index = state.index
      state.index !== themeList.length - 1 ? index++ : (index = 0)
      return themeList[index]
    default:
      return state
  }
}

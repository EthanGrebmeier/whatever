import { configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import checklistReducer from './applets/checklist/checklistSlice'

export default configureStore({
  reducer: {
    checklist: checklistReducer,
    middleware: [thunk]
  }
})
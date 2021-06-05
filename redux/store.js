import { configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import checklistReducer from './applets/checklist/checklistSlice'
import notepadReducer from './applets/notepad/notepadSlice'

export default configureStore({
  reducer: {
    checklist: checklistReducer,
    notepad: notepadReducer,
    middleware: [thunk]
  }
})
import { configureStore } from '@reduxjs/toolkit'
import checklistReducer from './applets/checklist/checklistSlice'

export default configureStore({
  reducer: {
    checklist: checklistReducer
  },
})
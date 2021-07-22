import { createSlice } from '@reduxjs/toolkit'

export const checklistSlice = createSlice({
  name: 'checklist',
  initialState: {
    checklists: [],
    loading: true,
    error: null
  },
  reducers: {
    fetchChecklistsBegin: (state) => {
      return {
        ...state,
        loading: true,
        error: null
      }
    },
    fetchChecklistsSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        checklists: action.payload.checklists
      }
    },
    createChecklist: (state, action) => {
      state.checklists.push(action.payload.checklist)
    },
    deleteChecklist: (state, action) => {
      state.checklists = state.checklists.filter((checklist) => checklist._id != action.payload.checklistID)
    },
    checkItem: (state, action) => {
      let checklistIndex = state.checklists.map((checklist) => (checklist._id)).indexOf(action.payload.checklistID)
      let itemIndex = state.checklists[checklistIndex].items.map(item => (item._id)).indexOf(action.payload.item._id)
      state.checklists[checklistIndex].items[itemIndex].isChecked = !state.checklists[checklistIndex].items[itemIndex].isChecked
    },
    completeItem: (state, action) => {
      let checklistIndex = state.checklists.map((checklist) => (checklist._id)).indexOf(action.payload.checklistID)
      let itemIndex = state.checklists[checklistIndex].items.map(item => (item._id)).indexOf(action.payload.item._id)
      state.checklists[checklistIndex].items[itemIndex].isCompleted = !state.checklists[checklistIndex].items[itemIndex].isCompleted
    },
    createItem: (state, action) => {
      let checklistIndex = state.checklists.map((checklist) => (checklist._id)).indexOf(action.payload.checklistID)
      let checklist = state.checklists[checklistIndex]
      let newItem = {
        isChecked: false,
        isCompleted: false,
        ...action.payload.item
      }
      checklist.items.push(newItem)
    },
    deleteItem: (state, action) => {
      let checklistIndex = state.checklists.map((checklist) => (checklist._id)).indexOf(action.payload.checklistID)
      state.checklists[checklistIndex].items = state.checklists[checklistIndex].items.filter(item => item._id != action.payload.item._id)
    },
    deleteAllItems: (state, action) => {
      let checklistIndex = state.checklists.map((checklist) => (checklist._id)).indexOf(action.payload.checklistID)
      state.checklists[checklistIndex].items = state.checklists[checklistIndex].items.filter(item => !item.isCompleted)
    }
  }
})

// Action creators are generated for each case reducer function
export const { 
  fetchChecklistsBegin,
  fetchChecklistsSuccess,
  createChecklist,
  deleteChecklist,
  checkItem, 
  completeItem, 
  createItem, 
  deleteItem, 
  deleteAllItems 
} = checklistSlice.actions

export default checklistSlice.reducer
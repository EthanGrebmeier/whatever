import { createSlice } from '@reduxjs/toolkit'

export const checklistSlice = createSlice({
  name: 'checklist',
  initialState: {
    checklists: {},
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
        checklists: action.payload
      }
    },
    createChecklist: (state, action) => {
      return {
        ...state,
        checklists: {
          ...state.checklists,
          [action.checklist._id]: action.checklist
        }
      }
    },
    deleteChecklist: (state, action) => {
      let checklistState = {...state.checklists}
      delete checklistState[action.checklist._id]
      return {
        ...state,
        checklists: checklistState
      }
    },
    checkItem: (state, action) => {
      for (const item of state.checklists[action.payload.checklistID].items){
          if (item._id == action.payload.item._id){
              item.isChecked = !item.isChecked
              console.log('Checked')
              console.log(item)
          }  
      }
    },
    completeItem: (state, action) => {
      for (const item of state.checklists[action.payload.checklistID].items){
          if (item._id == action.payload.item._id){
              item.isCompleted = !item.isCompleted
          }  
      }
    },
    createItem: (state, action) => {
      let checklist = state.checklists[action.payload.checklistID]
      let newItem = {
        isChecked: false,
        isCompleted: false,
        ...action.payload.item
      }
      checklist.items.push(newItem)
    },
    deleteItem: (state, action) => {
      return {
        ...state,
        checklists: {
          ...state.checklists,
          [action.payload.checklistID]: {
            ...state.checklists[action.payload.checklistID],
            items: state.checklists[action.payload.checklistID].items.filter(item => item._id !== action.payload.item._id)
          }
        }
      } 
    },
    deleteAllItems: (state, action) => {
      return {
        ...state,
        checklists: {
          ...state.checklists,
          [action.payload.checklistID]: {
            ...state.checklists[action.payload.checklistID],
            items: state.checklists[action.payload.checklistID].items.filter(item => !item.isCompleted)
          }
        }
      } 
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
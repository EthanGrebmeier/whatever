import { createSlice } from '@reduxjs/toolkit'
import getItems from './getItems'

export const checklistSlice = createSlice({
  name: 'checklist',
  initialState: {
    items: [],
    loading: true,
    error: null
  },
  reducers: {
    fetchItemsBegin: (state) => {
      return {
        ...state,
        loading: true,
        error: null
      }
    },
    fetchItemsSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    },
    fetchItemsFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      }
    },
    checkItem: (state, action) => {
      for (let item in state.items){
          if (state.items[item]._id == action.payload._id){
              state.items[item].isChecked = !state.items[item].isChecked
          }  
      }
    },
    completeItem: (state, action) => {
      for (let item in state.items){
          if (state.items[item]._id == action.payload._id){
              state.items[item].isCompleted = !state.items[item].isCompleted
          }  
      }
    },
    createItem: (state, action) => {
      let newItem = {
        isChecked: false,
        isCompleted: false,
        ...action.payload
      }
      state.items.push(newItem)
    },
    deleteItem: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload._id)
      } 
    },
    deleteAllItems: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => !item.isCompleted)
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { 
  fetchItemsBegin,
  fetchItemsSuccess,
  fetchItemsFailure,
  checkItem, 
  completeItem, 
  createItem, 
  deleteItem, 
  deleteAllItems 
} = checklistSlice.actions

export default checklistSlice.reducer
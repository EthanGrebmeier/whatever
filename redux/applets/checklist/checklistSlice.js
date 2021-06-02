import { createSlice } from '@reduxjs/toolkit'
import getItems from './getItems'

export const checklistSlice = createSlice({
  name: 'checklist',
  initialState: {
    items: getItems(),
  },
  reducers: {
    checkItem: (state, action) => {
      console.log(action)
      for (let item in state.items){
          if (state.items[item].id == action.payload.id){
              state.items[item].isChecked = !state.items[item].isChecked
          }  
      }
    },
    completeItem: (state, action) => {
      let index
      console.log(state.items)
      for (let item in state.items){
          if (state.items[item].id == action.payload.id){
              state.items[item].isCompleted = !state.items[item].isCompleted
              index = item
          }  
      }
    },
    createItem: (state, action) => {
      console.log(action)
      let newItem = {
        isChecked: false,
        isCompleted: false,
        ...action.payload
      }
      if (typeof action.index !== 'undefined') {
        state.items.splice(action.payload.index, 0, newItem)
      } else {
        state.items.push(newItem)
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { checkItem, completeItem, createItem } = checklistSlice.actions

export default checklistSlice.reducer
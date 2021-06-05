import { createSlice } from '@reduxjs/toolkit'

export const notepadSlice = createSlice({
  name: 'notepad',
  initialState: {
    title: '',
    text: '',
    loading: true,
    error: null
  },
  reducers: {
    fetchNotepadSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        title: action.payload.title,
        text: action.payload.text
      }
    },
    updateNotes: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { 
  fetchNotepadSuccess,
  updateNotes
} = notepadSlice.actions

export default notepadSlice.reducer
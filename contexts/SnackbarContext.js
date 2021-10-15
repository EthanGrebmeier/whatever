import { createContext, useContext, useEffect, useState } from "react";

const SnackbarContext = createContext(null);

export function SnackbarProvider(props){

  const [snackbar, setSnackbarObject] = useState({
    text: '',
    actionText: '',
    actionOnClick: undefined,
    id: Math.floor(Math.random() * 800 + 100)
  })

  const setSnackbar = (text) => {
    setSnackbarObject({
      ...snackbar,
      text
    })
  }

  return (
    <SnackbarContext.Provider value={
      {
        snackbar, 
        setSnackbar
      }
      }>
      {props.children}
    </SnackbarContext.Provider>
  );
}


export const useSnackbarContext = () => useContext(SnackbarContext)

import { createContext, useContext } from "react";

const SnackbarContext = createContext({snackBar: {
    text: '',
    actionText: '',
    actionOnClick: undefined,
    id: Math.floor(Math.random() * 800 + 100)
}});

export function SnackbarProvider(props){

  return (
    <SnackbarContext.Provider value={props.value}>
      {props.children}
    </SnackbarContext.Provider>
  );
}


export const useSnackbarContext = () => useContext(SnackbarContext)

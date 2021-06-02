import { createContext, useContext } from "react";

const ContextMenuContext = createContext({contextMenu: ''});

export function ContextMenuProvider(props){

  return (
    <ContextMenuContext.Provider value={props.value}>
      {props.children}
    </ContextMenuContext.Provider>
  );
}


export const useContextMenuContext = () => useContext(ContextMenuContext)

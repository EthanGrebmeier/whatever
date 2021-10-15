import { createContext, useContext, useState } from "react";

const ContextMenuContext = createContext(null);

export function ContextMenuProvider(props){

  const [contextMenu, setContextMenu] = useState({contextMenu: ''})

  return (
    <ContextMenuContext.Provider value={
      {
        contextMenu,
        setContextMenu
      }
    }>
      {props.children}
    </ContextMenuContext.Provider>
  );
}


export const useContextMenuContext = () => useContext(ContextMenuContext)

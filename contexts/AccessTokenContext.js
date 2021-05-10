import { createContext, useContext } from "react";

const AccessTokenContext = createContext({accessToken: ''});

export function AccessTokenProvider(props){

  return (
    <AccessTokenContext.Provider value={props.value}>
      {props.children}
    </AccessTokenContext.Provider>
  );
}


export const useAccessTokenContext = () => useContext(AccessTokenContext)

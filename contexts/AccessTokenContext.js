import { createContext, useContext, useState } from "react";

const AccessTokenContext = createContext({accessToken: ''});

export function AccessTokenProvider(props){

  const [accessToken, setAccessToken] = useState('')

  return (
    <AccessTokenContext.Provider value={
      {
        accessToken,
        setAccessToken
      }
      }>
      {props.children}
    </AccessTokenContext.Provider>
  );
}


export const useAccessTokenContext = () => useContext(AccessTokenContext)

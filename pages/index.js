import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header/Header'
import AppletSpace from '../components/AppletSpace/AppletSpace'
import {AccessTokenProvider, useAccessTokenContext} from '../contexts/AccessTokenContext'
import axios from 'axios'
import refreshAccessToken from '../scripts/refreshAccessToken'
import Snackbar from '../components/Snackbar/Snackbar'
import { SnackbarProvider } from '../contexts/SnackbarContext'
import store from '../redux/store'
import { Provider } from 'react-redux'
import { ContextMenuProvider } from '../contexts/ContextMenuContext'
import ContextMenu from '../components/Menu/ContextMenu'
import defaultApplets from '../applets/defaultApplets'
import hiddenBaseLayout from '../applets/hiddenBaseLayout'
import { getMobileComponentObject } from '../applets/applets'

const Site = styled.div`
  width: 100%;
  height: 100vh;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  overflow: hidden;
  @media screen and (max-width: 740px){
    background: ${props => props.mobileBackground};
    overflow: scroll;
  }
`

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  max-width: 1500px;
  box-sizing: border-box;
  padding: 2vh 2vw 10px 2vw;
  display: flex;
  flex-direction: column;

  *::-webkit-scrollbar {
    width: 5px;               
  }
  
  *::-webkit-scrollbar-track {
      background: none;        
  }

  *::-webkit-scrollbar-thumb {
      background-color: none;    
      border-radius: 50px;      
      border: 2px solid black;  
  }

  @media screen and (max-width: 740px){
    padding: 30px 15px 30px 15px;
  }
` 

const Dashboard = (props) => {
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState()
  const [user, setUser] = useState()
  const [accessToken, setAccessToken] = useState(props.accessToken || '')
  const [background, setBackground] = useState('#F49FBC')
  const [layout, setLayout] = useState() 
  const [mobileAppletId, setMobileAppletId] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState({
    isShowing: false,
    options: [],
    xPos: 0,
    yPos: 0,
  })

  const [snackbar, setSnackbar] = useState({
    text: '',
    actionText: '',
    actionOnClick: undefined,
    id: Math.floor(Math.random() * 800 + 100)
  })

  


  useEffect(async () => {
    if (user && accessToken) { 
      setBackground(user.settings.background)
      let defaultLayout = getDefaultLayout(user.layoutMeta.layouts, user.layoutMeta.defaultLayout)
      if (defaultLayout) {
        setLayout({...defaultLayout})
      } else if ( user.layoutMeta.layouts && user.layoutMeta.layouts.length > 0 ){
        setLayout(user.layoutMeta.layouts[0])
      } else if (!layout?.applets || layout.applets.length == 0){
        setLayout(defaultApplets)
      } else {
        setLayout(hiddenBaseLayout)
      }
    } else {
      setAccessToken('')
      setLayout(defaultApplets)
    }
  }, [user])

  useEffect(() => {
    if (!user && accessToken){
      setLoading(true)
      axios.get(process.env.NEXT_PUBLIC_URL + '/user').then(res => {
        setUser(res.data)
        setLoading(false)
        refreshAccessToken(setAccessToken)
      }).catch(err => {
        console.log(err)
        setLoading(false)
      })
    }
  }, [accessToken])

  useEffect(() => {

    
    document.addEventListener('click', () => setContextMenu({
      isShowing: false,
      options: [],
      xPos: 0,
      yPos: 0,
    }))

    setIsMobile(window.innerWidth <= 740)
    window.addEventListener('resize', handleWindowResizeChange)
    handleWindowResizeChange()
    setLoading(true)
    axios.get(process.env.NEXT_PUBLIC_URL + '/user').then(res => {
      setUser(res.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })

  }, [])

  const handleWindowResizeChange = () => {
    if (window.innerWidth < 740){
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  const contextMenuValue = {
    contextMenu: contextMenu,
    setContextMenu: setContextMenu
  }

  const accessTokenValue = {
    accessToken: accessToken,
    setAccessToken: setAccessToken
  }

  const setSnackbarValues = (text, actionText, actionOnClick) => {
    let id = Math.floor(Math.random() * 800 + 100)
    setSnackbar({
      text: text,
      actionText: actionText,
      actionOnClick: actionOnClick,
      id: id
    })
  }

  const snackbarValue = {
    snackbar: snackbar,
    setSnackbar: setSnackbarValues
  }

  const getDefaultLayout = (layouts, defaultLayout) => {
    for (let layout in layouts){
      if (layouts[layout]._id === defaultLayout){
        return {...layouts[layout]}
      }
    }

    if (layouts?.len > 0){
      return layouts[0]
    }

    return undefined
  }
  
  const getAppletIndex = (position) => {
    for (let applet in layout.applets){
      if (layout.applets[applet].position == position){
        return applet
      }
    }
  }

  const closeApplet = (position) => {
    
    let index = getAppletIndex(position) 
    let current = {...layout} 

    current.applets.splice(index, 1)
    setLayout(current)
  }

  const moveApplet = (oldPosition, newPosition) => {
    let index = getAppletIndex(oldPosition) 
    let current = {...layout} 
    current.applets[index].position = newPosition
    setLayout(current)
  }

  const setWidth = (position, width) => {
    let index = getAppletIndex(position)
    let current = {...layout} 
 
    current.applets[index].width = width 

    setLayout(current)
  }

  const setHeight = (position, height) => {
    let index = getAppletIndex(position)
    let current = {...layout} 

    current.applets[index].height = height
    setLayout(current)
  }
  
  return (
    <Provider store={store}>
      <SnackbarProvider value={snackbarValue}>
        <AccessTokenProvider value={accessTokenValue}>
          <ContextMenuProvider value={contextMenuValue}>
            <Site 
              background={background}
              mobileBackground={mobileMenuOpen ? '#CED0FA' : getMobileComponentObject(mobileAppletId).background}
            >
              <Wrapper>
                <Header
                  layout={layout}
                  setLayout={setLayout}
                  setBackground={setBackground}
                  background={background}
                  user={user}
                  setUser={setUser}
                  loading={loading}
                  mobileAppletId={mobileAppletId}
                  setMobileAppletId={setMobileAppletId}
                  mobileMenuOpen={mobileMenuOpen}
                  setMobileMenuOpen={setMobileMenuOpen}
                />
                {
                  layout && (
                  <AppletSpace
                    layout={layout}
                    setLayout={setLayout}
                    closeApplet={closeApplet}
                    moveApplet={moveApplet}
                    setWidth={setWidth}
                    setHeight={setHeight}
                    isMobile={isMobile}
                    loading={loading}
                    mobileAppletId={mobileAppletId}
                    setMobileAppletId={setMobileAppletId}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                  />
                  )
                }

                {
                snackbar.text && 
                <Snackbar 
                  {...snackbar}
                />
                }
                <ContextMenu
                  {...contextMenu}
                />
              </Wrapper>
            </Site>
          </ContextMenuProvider>
        </AccessTokenProvider>
      </SnackbarProvider>
    </Provider>
    
    
  )
}

export default Dashboard
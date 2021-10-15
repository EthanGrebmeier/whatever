import { useEffect, useState } from 'react'
import Header from '../Header/Header'
import AppletSpace from '../AppletSpace/AppletSpace'
import axios from 'axios'
import refreshAccessToken from '../../scripts/refreshAccessToken'
import Snackbar from '../Snackbar/Snackbar'
import ContextMenu from '../Menu/ContextMenu'
import defaultApplets from '../../applets/defaultApplets'
import hiddenBaseLayout from '../../applets/hiddenBaseLayout'
import { getMobileComponent, getMobileComponentObject } from '../../applets/applets'
import styled from 'styled-components'
import { useSnackbarContext } from '../../contexts/SnackbarContext'
import { useAccessTokenContext } from '../../contexts/AccessTokenContext'

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
    height: 105vh;
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
    padding: 10px 15px 10px 15px;
  }
` 

const Dashboard = () => {

    const {snackbar, setSnackbar} = useSnackbarContext()
    const {accessToken, setAccessToken} = useAccessTokenContext()

    const [loading, setLoading] = useState(false)
    const [isMobile, setIsMobile] = useState()
    const [user, setUser] = useState()
    
    const [background, setBackground] = useState('#F49FBC')
    const [layout, setLayout] = useState() 
    const [mobileApplet, setMobileApplet] = useState(getMobileComponent())
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [contextMenu, setContextMenu] = useState({
        isShowing: false,
        options: [],
        xPos: 0,
        yPos: 0,
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
            
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
        }
    }, [accessToken])


    useEffect(() => {

        refreshAccessToken(setAccessToken, setLoading)
        
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

        console.log(snackbar)

    }, [])

    const handleWindowResizeChange = () => {
        if (window.innerWidth < 740){
        setIsMobile(true)
        } else {
        setIsMobile(false)
        }
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

    const updateApplet = (position, newAppletObject) => {

        if (isMobile && newAppletObject) {
        setMobileApplet(newAppletObject)
        } else {
        const appletPosition = getAppletIndex(position)
        let currentApplets = [...layout.applets]
        currentApplets[appletPosition] = newAppletObject
        setLayout({
            ...layout, 
            applets: currentApplets
        })
        }
    }

    return (
        <Site  
            background={background}
            mobileBackground={mobileMenuOpen ? '#CED0FA' : mobileApplet.background}
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
                mobileApplet={mobileApplet}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
            {
                layout && (
                <AppletSpace
                layout={layout}
                setLayout={setLayout}
                background={background}
                closeApplet={closeApplet}
                moveApplet={moveApplet}
                setWidth={setWidth}
                setHeight={setHeight}
                isMobile={isMobile}
                loading={loading}
                mobileApplet={mobileApplet}
                setMobileApplet={setMobileApplet}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                user={user}
                setUser={setUser}
                updateApplet={updateApplet}
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
    )
}

export default Dashboard
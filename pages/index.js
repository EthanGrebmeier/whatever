import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header/Header'
import Appletspace from '../components/Appletspace/Appletspace'
import {AccessTokenProvider, useAccessTokenContext} from '../contexts/AccessTokenContext'
import axios from 'axios'
import refreshAccessToken from '../scripts/refreshAccessToken'
import Snackbar from '../components/Snackbar/Snackbar'
import { SnackbarProvider } from '../contexts/SnackbarContext'

const Site = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  overflow: hidden;
`

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  max-width: 1500px;
  box-sizing: border-box;
  padding: 30px 2vw 30px 2vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
` 

const Dashboard = (props) => {
  const [user, setUser] = useState()
  const [accessToken, setAccessToken] = useState(props.accessToken || '')
  const [background, setBackground] = useState('#F49FBC')
  const [layout, setLayout] = useState({
    name: 'Default',
    _id: 123456,
    applets: [
      {
        id: 'checklist'+ Math.floor(Math.random() * 800 + 100),
        name: 'Checklist',
        width: '49%',
        height: '49%',
        position: 'top left'
      },
    ]
  }) 
  const [snackbar, setSnackbar] = useState({
    text: '',
    actionText: '',
    actionOnClick: undefined,
    id: Math.floor(Math.random() * 800 + 100)
  })


  useEffect(async () => {
    if (user) { 

      refreshAccessToken(setAccessToken)
      
      setBackground(user.settings.background)
      if (layout._id == 123456){
        setLayout({...getDefaultLayout(user.layoutMeta.layouts, user.layoutMeta.defaultLayout)} || {
          name: 'Default',
          applets: [
            {
              id: 'checklist'+ Math.floor(Math.random() * 800 + 100),
              name: 'Checklist',
              width: '49%',
              height: '49%',
              position: 'top left'
            },
          ]
        })
      }
    } else if (accessToken) {
      axios.get(process.env.NEXT_PUBLIC_URL + '/user').then(res => {
        setUser(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [accessToken, user])

  useEffect(() => {

  }, [])


  const accessTokenValue = {
    accessToken: accessToken,
    setAccessToken: setAccessToken
  }

  const setSnackbarValues = (text, actionText, actionOnClick) => {
    let id = Math.floor(Math.random() * 800 + 100)
    console.log(id)
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
    console.log(layouts)
    console.log(defaultLayout)
    for (let layout in layouts){
      if (layouts[layout]._id === defaultLayout){
        console.log(layouts[layout])
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
    <SnackbarProvider value={snackbarValue}>
      <AccessTokenProvider value={accessTokenValue}>
        <Site background={background}>
          <Wrapper>
            <Header
              layout={layout}
              setLayout={setLayout}
              setBackground={setBackground}
              background={background}
              user={user}
              setUser={setUser}
            />
            <Appletspace
              layout={layout}
              setLayout={setLayout}
              closeApplet={closeApplet}
              moveApplet={moveApplet}
              setWidth={setWidth}
              setHeight={setHeight}
            />
            {
            snackbar.text && 
            <Snackbar 
              {...snackbar}
            />
            }

          </Wrapper>
        </Site>
      </AccessTokenProvider>
    </SnackbarProvider>
    
  )
}

export default Dashboard
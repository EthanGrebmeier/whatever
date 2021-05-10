import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header/Header'
import Appletspace from '../components/Appletspace/Appletspace'
import {AccessTokenProvider, useAccessTokenContext} from '../contexts/AccessTokenContext'

const Site = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
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
export async function getStaticProps(context){
  /*
  const accessToken = useAccessTokenContext()
  if (accessToken.accessToken) {
      axios.get('/api/user', {
          headers: {
              'Authorization' : 'Bearer ' + accessToken
          }
      }).then(res => {
          return {
              props: {
                  userProps: res.data
              }
          }
      }).catch(err => {
          return {
              props: {}
          }
      })
  }
  */
 return {
   props: {}
 }
}

const Dashboard = (props) => {
  const [user, setUser] = useState(props.userProps)
  const [accessToken, setAccessToken] = useState('')
  const [background, setBackground] = useState('#F49FBC')
  const [layout, setLayout] = useState({
    name: 'Default',
    applets: [
      {
        id: 'checklist',
        name: 'Checklist',
        width: '49%',
        height: '49%',
        position: 'top left'
      },
    ]
  }) 

  const accessTokenValue = {
    accessToken: accessToken,
    setAccessToken: setAccessToken
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
    console.log(current)
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
    console.log(current)
    current.applets[index].width = width 
    console.log(current)
    setLayout(current)
  }

  const setHeight = (position, height) => {
    let index = getAppletIndex(position)
    let current = {...layout}
    console.log(current)
    current.applets[index].height = height
    setLayout(current)
  }
  
  return (
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
        </Wrapper>
      </Site>
    </AccessTokenProvider>
  )
}

export default Dashboard
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header/Header'
import Appletspace from '../components/Appletspace/Appletspace'

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

const Dashboard = () => {
  const [background, setBackground] = useState('#F49FBC')
  const [layout, setLayout] = useState({
    name: 'Default',
    applets: [
      {
        id: 'notes',
        name: 'Notes',
        position: 'top left',
        width: '49%',
        height: '49%'
      },
      {
        id: 'notes',
        name: 'Notes',
        position: 'top right',
        width: '49%',
        height: '49%'
      },
      {
        id: 'notes',
        name: 'Notes',
        position: 'bottom right',
        width: '49%',
        height: '49%'
      },
      {
        id: 'notes', 
        name: 'Notes',
        position: 'bottom left',
        width: '49%',
        height: '49%'
      },
    ]
  }) 
  
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
  
  const setWidth = (position, width) => {
    let index = getAppletIndex(position)
    let current = {...layout}
    current.applets[index].width = width
    console.log(current)
    setLayout(current)
  }

  const setHeight = (position, height) => {
    let index = getAppletIndex(position)
    let current = {...layout}
    current.applets[index].height = height
    setLayout(current)
  }

  return (
    <Site background={background}>
      <Wrapper>
        <Header
          layout={layout}
          setLayout={setLayout}
          setBackground={setBackground}
          background={background}
        />
        <Appletspace
          layout={layout}
          setLayout={setLayout}
          closeApplet={closeApplet}
          setWidth={setWidth}
          setHeight={setHeight}
        />
      </Wrapper>
    </Site>
  )
}

export default Dashboard
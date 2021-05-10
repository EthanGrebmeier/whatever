import styled from 'styled-components'
import Applet from '../Applets/Applet'
import {getComponent} from '../../applets/applets'

const Wrapper = styled.div`
    width: 100%;
    height: 85vh; 
    position: relative;
`     

const AppletSpace = (props) => { 
    
    const setPosition = (oldPosition, newPosition) => {
        let layout = {...props.layout}
        for (let applet in layout.applets){
            if (layout.applets[applet].position == oldPosition){
                layout.applets[applet].position = newPosition
            }
        }
        props.setLayout(layout)
    }


    return(
        <Wrapper>
            {props.layout.applets && props.layout.applets.map( (applet, index) => {
                return <Applet
                    key={applet.id}
                    applet={applet}
                    closeApplet={props.closeApplet}
                    applets={props.layout.applets}
                    setPosition={setPosition}
                    width={applet.width}
                    height={applet.height}
                    setWidth={props.setWidth}
                    setHeight={props.setHeight}
                    moveApplet={props.moveApplet}
                    setLayout={props.setLayout}
                    layout={props.layout}
                >
                    {getComponent(applet.id.slice(0, -3))}
                </Applet>
            })}
        </Wrapper>
    )
}

export default AppletSpace 
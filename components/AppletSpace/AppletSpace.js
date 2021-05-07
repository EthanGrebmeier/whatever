import styled from 'styled-components'
import Applet from '../Applets/Applet'
   
const Wrapper = styled.div`
    width: 100%;
    height: 85vh; 
    position: relative;
`    

const AppletSpace = (props) => { 
    console.log(props)

    const setPosition = (oldPosition, newPosition) => {
        console.log(oldPosition)
        console.log(newPosition)
        let layout = {...props.layout}
        for (let applet in layout.applets){
            if (layout.applets[applet].position == oldPosition){
                layout.applets[applet].position = newPosition
            }
        }
        console.log(layout)
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
                    setWidth={props.setWidth}
                    setHeight={props.setHeight}
                    moveApplet={props.moveApplet}
                >
                    {applet.component}
                </Applet>
            })}
        </Wrapper>
    )
}

export default AppletSpace 
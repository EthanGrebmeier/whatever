import { useState } from 'react';
import styled from 'styled-components'
import AppletHeader from './AppletHeader';

const getPosition = ({position}) => {
    switch (position) { 
        case 'top left':
            return 'top: 0; left: 0;';
        case 'top right':
            return 'top: 0; right: 0;';
        case 'bottom left':
            return 'bottom: 0; left: 0;';
        case 'bottom right':
            return 'bottom: 0; right: 0;';
        default: 
            break;  
    }
}

const Wrapper = styled.div`  
    width: ${props => props.width};
    height: ${props => props.height};
    background: white;
    border-radius: 10px;
    border: 2px solid black;
    position: absolute;
    ${props => getPosition(props)}
    background: ${props => props.background};
    padding-top: 36px;
    transition: all .3s ease;
`

const Applet = (props) => {
    const [width, setWidth] = useState('49%')
    const [height, setHeight] = useState('49%')
    return(
        <Wrapper 
            position={props.applet.position} 
            background={props.background}
            width={width}
            height={height}
        >
            <AppletHeader
                closeApplet={props.closeApplet}
                name={props.applet.name}
                position={props.applet.position}
                setPosition={props.setPosition}
                applets={props.applets}
                setWidth={setWidth}
                setHeight={setHeight}
                width={width}
                height={height}
            />
            {props.children}
        </Wrapper>
    )
}

export default Applet
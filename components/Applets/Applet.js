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
    border-radius: 12px;
    border: 2px solid black;
    position: absolute;
    ${props => getPosition(props)}
    background: ${props => props.background};
    padding-top: 36px;
    transition: all .5s ease;
    overflow: hidden;
`

const Applet = (props) => {

    const setParentHeight = (newHeight) => {
        props.setHeight(props.applet.position, newHeight)
    }

    const setParentWidth = (newWidth) => {
        props.setWidth(props.applet.position, newWidth)
    }

    return(
        <Wrapper 
            position={props.applet.position} 
            background={props.background}
            width={props.width}
            height={props.height}
        >
            <AppletHeader
                closeApplet={props.closeApplet}
                name={props.applet.name}
                position={props.applet.position}
                setPosition={props.setPosition}
                applets={props.applets}
                setWidth={setParentWidth}
                setHeight={setParentHeight}
                width={props.width}
                height={props.height}
                moveApplet={props.moveApplet}
            />
            {props.children}
        </Wrapper>
    )
}

export default Applet
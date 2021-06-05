import styled from 'styled-components'
import HeaderDropdown from '../HeaderDropdown'
import applets from '../../../../applets/applets'
import { useState } from 'react'
import PickSpot from './PickSpot'
import ConfirmSpot from './ConfirmSpot'

const Wrapper = styled.div`

    height: ${props => props.height};
    width: 320px;
    background: white;
    border: 2px solid black;
    border-radius: 0 0 10px 10px;
    padding: 20px 10px 20px 10px;
`

const Applet = styled.p`
    &:hover{
        font-weight: 800;
        cursor: pointer;
    }
`

const Applets = (props) => {

    const [isPickingSpot, setIsPickingSpot] = useState(false)
    const [isConfirmingSpot, setIsConfirmingSpot] = useState(false)
    const [newApplet, setNewApplet] = useState({})
    const [newPosition, setNewPosition] = useState(0)
    const [oldAppletPosition, setOldAppletPosition] = useState(0)

    const resetState = () => {
        setIsPickingSpot(false)
        setIsConfirmingSpot(false)
        setNewApplet({})
        setOldAppletPosition(0)
        props.setIsHovered(false)
    }

    const pickNewApplet = (applet) => {
        setNewApplet(applet)
        setIsPickingSpot(true)
    }

    const getAppletPosition = (position) => {
  
        switch (position) {
            case 0:
                return 'top left'
            case 1:
                return 'top right'
            case 2:
                return 'bottom left'
            case 3:
                return 'bottom right'
            default:
                return 'top left';
        }
    }


    const getAppletIndex = (position) => {
        for (let index in props.layout.applets){
            if (props.layout.applets[index].position === position){
                return index
            }
        }
        return undefined
    }

    const checkPositionEmpty = (position) => {
        return getAppletIndex(position) == undefined ? true : false
    }

    const checkWideAtIndex = (appletIndex, current) => {
        return current.applets[appletIndex].width === '100%'
    }

    const checkTallAtIndex = (appletIndex, current) => {
        return current.applets[appletIndex].height === '100%'
    }

    const shrinkTallApplet = (index, current) => {
        current.applets[index].height = '49%'
        return current
    }

    const shrinkWideApplet = (index, current) => {
        current.applets[index].width = '49%'
        return current
    }

    const adjustExpandedApplets = (position, currentLayout) => {
        const [y, x] = position.split(' ')
        let wideAppletIndex
        let tallAppletIndex
        let widePosition
        let tallPosition
        if (y === 'top' && x === 'left'){
            widePosition = 'top right'
            tallPosition = 'bottom left'
        } else if (y === 'top' && x === 'right'){
            tallPosition = 'bottom right'
            widePosition = 'top left'
        } else if (y === 'bottom' && x === 'left'){
            tallPosition = 'top left'
            widePosition = 'bottom right'
        } else if (y === 'bottom' && x === 'right'){
            tallPosition = 'top right'
            widePosition = 'bottom left'
        }
        wideAppletIndex = getAppletIndex(widePosition)
        tallAppletIndex = getAppletIndex(tallPosition)

        if (wideAppletIndex && checkWideAtIndex(wideAppletIndex, currentLayout)){
            currentLayout = shrinkWideApplet(wideAppletIndex, currentLayout)
        } 
        if (tallAppletIndex && checkTallAtIndex(tallAppletIndex, currentLayout)){
            
            currentLayout = shrinkTallApplet(tallAppletIndex, currentLayout)

        }

        return currentLayout
    }
    
    const addApplet = (applet, position, replaceAt) => {
        const newAppletPosition = getAppletPosition(position)
        if (!checkPositionEmpty(newAppletPosition) && !replaceAt){
            setOldAppletPosition(getAppletIndex(newAppletPosition))
            setNewPosition(position)
            setIsConfirmingSpot(true)
        } else {
            let layout = {...props.layout}

            layout = adjustExpandedApplets(newAppletPosition, layout)
            applet.position = newAppletPosition
            replaceAt && layout.applets.splice(replaceAt, 1)
            let newApplet = {...applet}
            newApplet.width = '49%'
            newApplet.height = '49%'
            newApplet.id = newApplet.id + Math.floor(Math.random() * 800 + 100);
            layout.applets.push(newApplet)
            props.setLayout(layout)
            resetState()
        }
    }

    return (
        isPickingSpot ? (
            isConfirmingSpot ? (
                <Wrapper height='160px'>
                    <ConfirmSpot
                        oldApplet={props.layout.applets[oldAppletPosition]}
                        replaceAt={oldAppletPosition}
                        newApplet={newApplet}
                        addApplet={addApplet}
                        position={newPosition}
                        setIsConfirmingSpot={setIsConfirmingSpot}
                    />
                </Wrapper>
            ) : (
                <Wrapper height='300px'>
                    <PickSpot
                        applets={props.applets}
                        newApplet={newApplet}
                        setIsPickingSpot={setIsPickingSpot}
                        addApplet={addApplet}
                        getAppletIndex={getAppletIndex}
                        getAppletPosition={getAppletPosition}
                    />
                </Wrapper>
            )
        ) : (
            <Wrapper height='200px'>
                {applets.map( applet => (
                <Applet
                    onClick={() => pickNewApplet(applet)}
                    key={applet.name}
                > 
                    {applet.name}
                </Applet>
                ))} 
            </Wrapper>
        )
    )
}

export default Applets
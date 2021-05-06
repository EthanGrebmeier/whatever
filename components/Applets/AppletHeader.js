import styled from 'styled-components'
import { UilTimes, UilGripHorizontalLine, UilArrowFromRight, UilLeftArrowFromLeft, UilTopArrowFromTop, UilArrowFromTop } from '@iconscout/react-unicons'

const Wrapper = styled.div`
    width: 100%;
    padding: 2px 10px 2px 10px; 
    border-bottom: 2px solid black;
    background: white;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
`

const ModuleHeaderControls = styled.div`
    display: flex;
    align-items: center;
`

const ModuleHeaderControl = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: 5px;
`

const AppletHeader = (props) => {

    console.log(props)

    const setWidth = () => {

    }

    const checkPosition = (expandPositionY, expandPositionX) => {
        const checkedPosition = `${expandPositionY} ${expandPositionX}`
        for (let applet in props.applets) {
            if (props.applets[applet].position == checkedPosition){
                return false
            }
        }
        console.log(checkedPosition)
        return true
    }

    const canAppletExpand = (direction) => {
        const [y, x] = props.position.split(' ')
        switch (direction) {
            case 'right':
                return checkPosition(y, 'right')
            case 'left':
                return checkPosition(y, 'left')
            case 'down':
                return checkPosition('bottom', x)
            case 'up':
                return checkPosition('top', x)
            default:
                break;
        }
    }

    const renderArrows = () => {
        return (
            <>
                {canAppletExpand('left') && <ExpandLeft/>}
                {canAppletExpand('right') && <ExpandRight/>}
                {canAppletExpand('down') && <ExpandDown/>}
                {canAppletExpand('up') && <ExpandUp/>}
            </>
        )
    }

    const ExpandUp = () => {
        const expandComponentUp = () => {
            props.setHeight('100%')
        }
        return (
            <ModuleHeaderControl onClick={expandComponentUp}>
                <UilTopArrowFromTop/>
            </ModuleHeaderControl>
        )
    }

    const ExpandRight = () => {
        const expandComponentRight = () => {
            props.setWidth('100%')
        }
        return (
            <ModuleHeaderControl onClick={expandComponentRight}>
                <UilArrowFromRight/>
            </ModuleHeaderControl>
        )
    }

    const ExpandDown = () => {
        const expandComponentDown = () => {
            props.setHeight('100%')
        }
        return (
            <ModuleHeaderControl onClick={expandComponentDown}>
                <UilArrowFromTop/>
            </ModuleHeaderControl>
        )
    }

    const ExpandLeft = () => {
        const expandComponentLeft = () => {
            props.setWidth('100%')
        }
        return (
            <ModuleHeaderControl onClick={expandComponentLeft}>
                <UilLeftArrowFromLeft/>
            </ModuleHeaderControl>
        )
    }

    return(
        <Wrapper>
            <h2>
                {props.name}
            </h2>
            <ModuleHeaderControls>
                {renderArrows()}
                <ModuleHeaderControl>
                    <UilGripHorizontalLine/>
                </ModuleHeaderControl>
                <ModuleHeaderControl onClick={() => props.closeApplet(props.position)}>
                    <UilTimes/>
                </ModuleHeaderControl>
            </ModuleHeaderControls>
        </Wrapper> 
    )
}

export default AppletHeader
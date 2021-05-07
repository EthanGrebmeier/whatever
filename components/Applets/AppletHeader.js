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
        // Check directly in the position
        for (let applet in props.applets) {
            if (props.applets[applet].position == checkedPosition){
                return false
            }
        }
        
        return true
    }



    const canAppletExpand = (direction) => {
        const [y, x] = props.position.split(' ')
        switch (direction) {
            case 'right':
                return props.width == '100%' ? false : checkPosition(y, 'right')
            case 'left':
                return props.width == '100%' ? false : checkPosition(y, 'left')
            case 'down':
                return props.height == '100%' ? false : checkPosition('bottom', x)
            case 'up':
                return props.height == '100%' ? false : checkPosition('top', x)
            default:
                break;
        }
    }

    const canAppletShrink = (direction) => {
        const [y, x] = props.position.split(' ')
        switch (direction) {
            case 'right':
                return props.width == '100%'
            case 'left':
                return props.width == '100%'
            case 'down':
                return props.height == '100%'
            case 'up':
                return props.height == '100%'
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
                {canAppletShrink('left') && <ShrinkLeft/>}
                {canAppletShrink('right') && <ShrinkRight/>}
                {canAppletShrink('down') && <ShrinkDown/>}
                {canAppletShrink('up') && <ShrinkUp/>}
            </>
        )
    }

    const ShrinkUp = () => {
        const shrinkComponentUp = () => {
            const [y, x] = props.position.split(' ')
            if (y == 'bottom'){
                props.moveApplet(props.position, `top ${x}`)
            }
            props.setHeight('49%')
        }
        return (
            <ModuleHeaderControl onClick={shrinkComponentUp}>
                <UilTopArrowFromTop title='test'/>
            </ModuleHeaderControl>
        )
    }

    const ShrinkDown = () => {
        const shrinkComponentDown = () => {
            const [y, x] = props.position.split(' ')
            if (y == 'top'){
                props.moveApplet(props.position, `bottom ${x}`)
            }
            props.setHeight('49%')
        }
        return (
            <ModuleHeaderControl onClick={shrinkComponentDown}>
                <UilArrowFromTop title='test'/>
            </ModuleHeaderControl>
        )
    }

    const ShrinkLeft = () => {
        const shrinkComponentLeft = () => {
            const [y, x] = props.position.split(' ')
            if (x == 'right'){
                props.moveApplet(props.position, `${y} left`)
            }
            props.setWidth('49%')
        }
        return (
            <ModuleHeaderControl onClick={shrinkComponentLeft}>
                <UilLeftArrowFromLeft title='test'/>
            </ModuleHeaderControl>
        )
    }

    const ShrinkRight = () => {
        const shrinkComponentRight = () => {
            const [y, x] = props.position.split(' ')
            if (x == 'left'){
                props.moveApplet(props.position, `${y} right`)
            }
            props.setWidth('49%')
        }
        return (
            <ModuleHeaderControl onClick={shrinkComponentRight}>
                <UilArrowFromRight/>
            </ModuleHeaderControl>
        )
    }

    const ExpandUp = () => {
        const expandComponentUp = () => {
            props.setHeight('100%')
        }
        return (
            <ModuleHeaderControl onClick={expandComponentUp}>
                <UilTopArrowFromTop title='test'/>
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
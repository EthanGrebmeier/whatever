import styled from 'styled-components'
import { UilTimes, UilGripHorizontalLine, UilArrowFromRight, UilLeftArrowFromLeft, UilTopArrowFromTop, UilArrowFromTop } from '@iconscout/react-unicons'
import IconButton from '../Buttons/IconButton'

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

const AppletHeader = (props) => {

    const getAppletAtPosition = (y, x) => {
        const checkedPosition = `${y} ${x}`
        if (props?.applets){
            for (let applet in props.applets) {
                const checkedApplet = props.applets[applet]
                if (checkedApplet.position == checkedPosition){
                    return checkedApplet
                }
            }
        }
        return undefined
    }

    const checkPosition = (expandPositionY, expandPositionX, direction) => {
        // Check directly in the position
        const applet = getAppletAtPosition(expandPositionY, expandPositionX)
        return typeof applet == 'undefined' ? true : (false)
    }

    const getOpposite = (position) => {
        switch (position) {
            case 'top':
                return 'bottom'
            case 'bottom' : 
                return 'top'
            case 'left' : 
                return 'right'
            case 'right' :
                return 'left'
            default:
                break;
        }
    }

    const checkHeight = (y, x) => {
        const position = [getOpposite(y),x]
        const applet = getAppletAtPosition(position[0], position[1])
        if (props.height == '100%' && applet){
            return false
        }
        return typeof applet == 'undefined' ? true : applet.height !== '100%'
    }

    const checkWidth = (y, x) => {
        const position = [y,getOpposite(x)]

        const applet = getAppletAtPosition(position[0], position[1])

        if (props.width == '100%' && applet){
            return false
        }
        return typeof applet == 'undefined' ? true : applet.width !== '100%'
    }


    const canAppletExpand = (direction) => {
        const [y, x] = props.position.split(' ')
        switch (direction) {
            case 'right':
                return props.width == '100%' ? false : (checkPosition(y, 'right') && checkHeight(y, 'right'))
            case 'left':
                return props.width == '100%' ? false : (checkPosition(y, 'left') && checkHeight(y, 'left'))
            case 'down':
                return props.height == '100%' ? false : (checkPosition('bottom', x) && checkWidth('bottom', x))
            case 'up':
                return props.height == '100%' ? false : (checkPosition('top', x) && checkWidth('top', x))
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
                <ExpandLeft disabled={!canAppletExpand('left')}/>
                <ExpandRight disabled={!canAppletExpand('right')}/>
                <ExpandDown disabled={!canAppletExpand('down')}/>
                <ExpandUp disabled={!canAppletExpand('up')}/>
                <ShrinkLeft disabled={!canAppletShrink('left')}/>
                <ShrinkRight disabled={!canAppletShrink('right')}/>
                <ShrinkDown disabled={!canAppletShrink('down')}/>
                <ShrinkUp disabled={!canAppletShrink('up')}/>
            </>
        )
    }

    const ShrinkUp = ({disabled}) => {
        const shrinkComponentUp = () => {
            const [y, x] = props.position.split(' ')
            if (y == 'bottom'){
                props.moveApplet(props.position, `top ${x}`)
            }
            props.setHeight('49%')
        }
        return (
            <IconButton tooltip='Shrink Up' onClick={shrinkComponentUp} disabled={disabled}>
                <UilTopArrowFromTop title='test' color={disabled ? '#A3B9C9' : 'black'}/>
            </IconButton>
        )
    }

    const ShrinkDown = ({disabled}) => {
        const shrinkComponentDown = () => {
            const [y, x] = props.position.split(' ')
            if (y == 'top'){
                props.moveApplet(props.position, `bottom ${x}`)
            }
            props.setHeight('49%')
        }
        return (
            <IconButton tooltip='Shrink Down' onClick={shrinkComponentDown} disabled={disabled}>
                <UilArrowFromTop title='test' color={disabled ? '#A3B9C9' : 'black'}/>
            </IconButton>
        )
    }

    const ShrinkLeft = ({disabled}) => {
        const shrinkComponentLeft = () => {
            const [y, x] = props.position.split(' ')
            if (x == 'right'){
                props.moveApplet(props.position, `${y} left`)
            }
            props.setWidth('49%')
        }
        return (
            <IconButton tooltip='Shrink Left' onClick={shrinkComponentLeft} disabled={disabled}>
                <UilLeftArrowFromLeft title='test' color={disabled ? '#A3B9C9' : 'black'}/>
            </IconButton>
        )
    }

    const ShrinkRight = ({disabled}) => {
        const shrinkComponentRight = () => {
            const [y, x] = props.position.split(' ')
            if (x == 'left'){
                props.moveApplet(props.position, `${y} right`)
            }
            props.setWidth('49%')
        }
        return (
            <IconButton tooltip='Shrink Right' onClick={shrinkComponentRight} disabled={disabled}>
                <UilArrowFromRight color={disabled ? '#A3B9C9' : 'black'}/>
            </IconButton>
        )
    }

    const ExpandUp = ({disabled}) => {
        const expandComponentUp = () => {
            props.setHeight('100%')
        }
        return (
            <IconButton tooltip='Expand Up'  onClick={expandComponentUp} disabled={disabled}>
                <UilTopArrowFromTop title='test' color={disabled ? '#A3B9C9' : 'black'}/>
            </IconButton>
        )
    }

    const ExpandRight = ({disabled}) => {
        const expandComponentRight = () => {
            props.setWidth('100%')
        }
        return (
            <IconButton tooltip='Expand Right' onClick={expandComponentRight} disabled={disabled}>
                <UilArrowFromRight color={disabled ? '#A3B9C9' : 'black'}/>
            </IconButton>
        )
    }

    const ExpandDown = ({disabled}) => {
        const expandComponentDown = () => {
            props.setHeight('100%')
        }
        return (
            <IconButton tooltip='Expand Down' onClick={expandComponentDown} disabled={disabled}>
                <UilArrowFromTop color={disabled ? '#A3B9C9' : 'black'}/>
            </IconButton>
        )
    }

    const ExpandLeft = ({disabled}) => {
        const expandComponentLeft = () => {
            props.setWidth('100%')
        }
        return (
            <IconButton tooltip='Expand Left' onClick={expandComponentLeft} disabled={disabled}>
                <UilLeftArrowFromLeft color={disabled ? '#A3B9C9' : 'black'}/>
            </IconButton>
        )
    }

    return(
        <Wrapper>
            <h2>
                {props.name}
            </h2>
            <ModuleHeaderControls>
                {renderArrows()}
                <IconButton tooltip={'Close ' + props.name} onClick={() => props.closeApplet(props.position)}>
                    <UilTimes/>
                </IconButton>
            </ModuleHeaderControls>
        </Wrapper> 
    )
}

export default AppletHeader
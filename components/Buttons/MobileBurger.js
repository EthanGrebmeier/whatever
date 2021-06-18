import styled from 'styled-components'
import { UilBars, UilTimes } from '@iconscout/react-unicons'
import IconButton from './IconButton'

const MobileBurger = ({isOpen, toggleOpen}) => {
    return (
        <IconButton
            onClick={toggleOpen}
        >
            {
                isOpen ? <UilTimes/> : <UilBars/>
            }
        </IconButton>
    )
}

export default MobileBurger
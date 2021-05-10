import styled from 'styled-components'
import {UilAngleDown} from '@iconscout/react-unicons'
import { cloneElement, useState } from 'react'

const Wrapper = styled.div`
    height: 100%;
    width: ${props => props.isText ? '120px' : 'initial'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 40px;
    cursor: default;
    position: relative;

    p {
        margin-right: ${props => props.hasSpace ? '20px' : ''};
    }
`

const Dropdown = styled.div`
    transition: height .2s ease;
    overflow: hidden;
    box-sizing: border-box;
    z-index: ${props => props.isHovered ? '200' : '100'};
    display: ${props => props.isHovered ? 'initial' : 'none'};
    position: absolute;
    top: 60px;
    left: ${props => props.left};
    right: ${props => props.right};
`


const HeaderDropdown = (props) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseLeave = (e) => {
        if (e.nativeEvent.toElement){
            setIsHovered(false) 
        }
    }

    return (
        <>
            <Wrapper 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={(e) => {handleMouseLeave(e)}}
                hasSpace={props.titleIcon && props.titleText}
            >
                <p>
                    {props.titleText}
                </p>
                {props.titleIcon}
                {props.showCarrot && <UilAngleDown/>}
                <Dropdown isHovered={isHovered} height={props.height} right={props.right}>
                    {props.children && cloneElement(props.children, {setIsHovered: setIsHovered})}
                </Dropdown>
            </Wrapper>

        </>
    )
}

export default HeaderDropdown
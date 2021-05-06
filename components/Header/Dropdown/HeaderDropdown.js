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
    const isText = typeof props.title == 'string'

    return (
        <>
            <Wrapper 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                isText={isText}
            >
                {isText ? (
                <p>
                    {props.title}
                </p>
                ) : (
                <props.title/>
                )}
                {props.showCarrot && <UilAngleDown/>}
                <Dropdown isHovered={isHovered} height={props.height} right={props.right}>
                    {props.children && cloneElement(props.children, {setIsHovered: setIsHovered})}
                </Dropdown>
            </Wrapper>

        </>
    )
}

export default HeaderDropdown
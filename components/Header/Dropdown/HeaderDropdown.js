import styled from 'styled-components'
import {UilAngleDown} from '@iconscout/react-unicons'
import { cloneElement, useState } from 'react'

const Wrapper = styled.div`
    height: 100%;
    width: ${props => props.isText ? '120px' : 'initial'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: ${props => !props.noMargin ? '40px' : ''};
    cursor: default;
    position: relative;
    padding: 10px;
    z-index: 201;
    p {
        margin-right: ${props => props.hasSpace ? '20px' : ''};
    }

    @media screen and (max-width: 850px) {
        
        p {
            margin-right: ${props => props.hasSpace ? '10px' : ''};
            font-size: 14px;
        }
    }

    @media screen and (max-width: 740px){
        display: none;
    }
`

const Dropdown = styled.div`
    transition: height .2s ease;
    overflow: hidden;
    box-sizing: border-box;
    z-index: ${props => props.isHovered ? '200' : '100'};
    display: ${props => props.isHovered ? 'initial' : 'none'};
    position: absolute;
    top: 0px;
    padding-top: 56px;
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
                noMargin={props.noMargin}
            >
                <p>
                    {props.titleText}
                </p>
                {props.titleIcon}
                {props.showCarrot && <UilAngleDown/>}
                <Dropdown 
                    isHovered={isHovered} 
                    height={props.height} 
                    right={props.right}
                >
                    {props.children && cloneElement(props.children, {setIsHovered: setIsHovered})}
                </Dropdown>
            </Wrapper>

        </>
    )
}

export default HeaderDropdown
import { useState } from "react"
import styled from 'styled-components'

const Wrapper = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    position: relative;
`

const Tooltip = styled.div`
    width: 90px;
    text-align: center;
    background: black;
    border-radius: 10px;
    color: white;
    padding: 5px;
    position: absolute;    
    left: -100px;
    display: ${props => props.showTooltip ? 'flex' : 'none'};
    font-family: 'Quicksand'; 
    p {
        width: 100%;
        font-size: 12px;
    }  
   
`


const IconButton = ({children, onClick, tooltip}) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Wrapper onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} onClick={onClick}>
            {tooltip && (
            <Tooltip
            showTooltip={isHovered}
            >
                <p> {tooltip} </p>
            </Tooltip>
            )}
            {children}
        </Wrapper>
    )
} 

export default IconButton
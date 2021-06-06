import { useState } from "react"
import styled from 'styled-components'


const ButtonWrapper = styled.span`
    position: relative;

`

const Wrapper = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Tooltip = styled.div`
    min-width: 90px;
    text-align: center;
    background: black;
    border-radius: 10px;
    color: white;
    padding: 5px;
    position: absolute;    
    right: 25px;
    top: 0;
    z-index: 10;
    display: ${props => props.showTooltip ? 'flex' : 'none'};
    font-family: 'Quicksand'; 
    && p {
        width: 100%;
        font-size: 12px;
    }  
    
    @media screen and (max-width: 740px){
        display: none;
    }
   
`


const IconButton = ({children, onClick, tooltip}) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <ButtonWrapper>
            <Wrapper onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} onClick={onClick}>
                {children}
            </Wrapper>
            {tooltip && (
            <Tooltip
            showTooltip={isHovered}
            >
                <p> {tooltip} </p>
            </Tooltip>
            )}
        </ButtonWrapper>
    )
} 

export default IconButton
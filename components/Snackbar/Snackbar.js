import { useEffect, useState } from "react";
import {UilTimes} from '@iconscout/react-unicons'
import styled from "styled-components";
import IconButton from "../Buttons/IconButton";

const Wrapper = styled.div`
    position: absolute;
    z-index: 100;
    bottom: ${props => props.isShowing ? '10px' : '-70px'};
    left: 50%;
    transform: translateX(-50%);
    min-width: 300px;
    padding: 5px 10px 5px 10px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    background: black;
    font-size: 14px;
    transition: bottom .3s ease;
    @media screen and (max-width: 740px){
        display: ${props => props.isShowing ? 'flex' : 'none'};
    }
`

const SnackbarText = styled.p`
    color: white;
`

const ActionText = styled.button`
    width: 20%;
    padding: 0;
    font-size: 16px;
    color: #A0CA92;
    overflow: hidden;
    text-decoration: underline; 
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
`

const Snackbar = ({text, actionText, actionOnClick, id}) => {

    const [isShowing, setIsShowing] = useState(false)
    const [timeoutArray, setTimeoutArray] = useState([])

    useEffect(() => {
        setIsShowing(true)
        clearTimeouts()
        let currentTimeoutArray = [...timeoutArray]
        let timeout = setTimeout(() => {
            setIsShowing(false)
        }, 8000)
        currentTimeoutArray.push(timeout)
        setTimeoutArray(currentTimeoutArray)
    }, [id])

    const clearTimeouts = () => {
        for (let timeout in timeoutArray){
            clearTimeout(timeoutArray[timeout])
        }
    }

    const handleClick = () => {
        actionOnClick && actionOnClick()
        setIsShowing(false)
    }

    return (
        <Wrapper isShowing={isShowing}>
            <SnackbarText>
                {text}
            </SnackbarText>
            {
            actionText && (
            <ActionText onClick={handleClick}>
                {actionText}
            </ActionText>
            )
            }
            <IconButton onClick={() => setIsShowing(false)}>
                <UilTimes color='white'/>
            </IconButton>
        </Wrapper>
    )
}

export default Snackbar
import { useEffect, useState } from "react";
import {UilTimes} from '@iconscout/react-unicons'
import styled from "styled-components";
import IconButton from "../Buttons/IconButton";

const Wrapper = styled.div`
    position: absolute;
    bottom: ${props => props.isShowing ? '10px' : '-50px'};
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    padding: 5px 10px 5px 10px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    background: black;
    font-size: 14px;
    transition: bottom .3s ease;
`

const SnackbarText = styled.p`
    width: 70%;
    color: white;
`

const ActionText = styled.p`
    width: 25%;
    color: #A0CA92;
    overflow: hidden;
    text-decoration: underline;
    text-align: end;
`

const Snackbar = ({text, actionText, actionOnClick, id}) => {

    const [isShowing, setIsShowing] = useState(false)

    useEffect(() => {
        console.log(id)
        setIsShowing(true)
        setTimeout(() => {
            setIsShowing(false)
        }, actionOnClick ? 8000 : 4000)
    }, [id])

    return (
        <Wrapper isShowing={isShowing}>
            <SnackbarText>
                {text}
            </SnackbarText>
            {
            actionText && (
            <ActionText onClick={actionOnClick}>
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
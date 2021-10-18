import { useEffect, useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    background: ${props => props.background};
    border-radius: 0 0 10px 10px;
    transition: all .3s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    *:disabled{
        color: black;
        cursor: text;
    }

    @media screen and (max-width: 740px){
        padding: 0;
    }
`

const TimerButton = styled.button`
    
`

const Clock = ({applet}) => {

    const [currentTime, setCurrentTime] = useState(new Date())


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <Wrapper
            background={applet.background}
        >

            <h1>
                {currentTime.toLocaleTimeString()}
            </h1>
        </Wrapper>
    )
}

export default Clock
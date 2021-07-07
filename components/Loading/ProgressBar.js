import { useEffect, useState } from "react"
import styled, {keyframes} from "styled-components"

const Wrapper = styled.div`
    width: 80%;
    height: 35px;
    border: 2px solid black;
    border-radius: 10px;
`

const Expand = keyframes`
    0% { width: 0%;}
    10% { width: 10%; }
    30% { width: 20%; }
    50% { width: 50%; }
    70% { width: 60%; }
    90% { width: 90%; }
    100% { width: 100%; }
`

const Inner = styled.div`
    height: 100%;
    width: ${props => props.newLoad ? '100%' : '0%'};
    background: black;
    border-radius: 7px;
    animation-name: ${Expand};
    animation-duration: 8s;
`



const ProgressBar = ({loadTime}) => {

    const [newLoad, setNewLoad] = useState(false)
    const [timeouts, setTimeouts] = useState([])

    useEffect(() => {
        let currentTimeouts = timeouts
        setNewLoad(true)
        currentTimeouts.push(setTimeout(() => {
            setNewLoad(false)
        }, loadTime))
        setTimeouts(currentTimeouts)
        return () => {
            for (const timeout of currentTimeouts){
                clearTimeout(timeout)
            }
        }
    }, [loadTime])

    return (
        <Wrapper>
            <Inner
                loadTime={loadTime}
                newLoad={newLoad}
            />
        </Wrapper>
    )
}

export default ProgressBar
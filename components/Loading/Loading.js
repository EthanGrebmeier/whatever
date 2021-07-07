import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSnackbarContext } from '../../contexts/SnackbarContext'
import ProgressBar from './ProgressBar'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px solid black;
`

const Loading = () => {
    const [text, setText] = useState('')
    const [loadTime, setLoadTime] = useState(0)
    const snackbarContext = useSnackbarContext()

    const phrases = [
        "Loading",
        "Defrosting Servers",
        "Coloring Applets",
        "Watering Plants",
        "Taking a Lunch Break",
        "Speaking to the Manager",
        "Populating Population",
        "Gnidaol",
        "Dropping Tables",
        "Developing Impressive Application"
    ]



    useEffect(() => {
        let timeouts = []

        const getLoadingText = () => {
            let newLoad = Math.floor(Math.random() * 2000) + 1000
            
            timeouts.push(setTimeout(() => {
                setText(phrases[Math.floor(Math.random() * 10)])
                getLoadingText()
            }, newLoad))
            
            setLoadTime(newLoad)
        }

        console.log(snackbarContext)
        timeouts.push(setTimeout(() => {
            snackbarContext.setSnackbar('Something definitely broke. Thats my bad...')
        }, 15000))

        setText(phrases[0])

        getLoadingText()

        return () => {
            for (const timeout of timeouts){
                console.log(timeout)
                clearTimeout(timeout)
            }
        }
    }, [])
    return (
        <Wrapper>
            <ProgressBar
                loadTime={loadTime}
            />
            <h1> {text}... </h1>
        </Wrapper>
    )
}

export default Loading
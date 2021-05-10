import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Login from './Login'
import Profile from './Profile'
import Register from './Register'

const Wrapper = styled.div`
    background: white;
    border: 2px solid black;
    border-radius: 0 0 10px 10px;
    padding: 10px;
    p{
        margin: 0;
    }
`

const User = (props) => {
    const [currentFrame, setCurrentFrame] = useState('')

    useEffect(() => {
        if (props.user && props.accessToken){
            setCurrentFrame('profile')
        } else {
            setCurrentFrame('login')
        }
        console.log(props.frame)
        console.log(props.user)
        console.log(props.accessToken)
    }, [props.user])

    const renderFrame = (frame) => {
        switch (frame) {
            case 'login':
                return (
                <Login
                    setCurrentFrame={setCurrentFrame}
                />
                )
            case 'register':
                return ( 
                <Register
                    setCurrentFrame={setCurrentFrame}
                    layout={props.layout}
                    background={props.background}
                />
                )
            case 'profile':
                return (
                <Profile
                    user={props.user}
                    logout={props.logout}
                />
                )
            default:
                break;
        }
    }

    return (
        <Wrapper>
            {renderFrame(currentFrame)}
        </Wrapper>
    )
}

export default User
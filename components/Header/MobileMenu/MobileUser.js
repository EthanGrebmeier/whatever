import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Back from '../../Buttons/Back'
import Login from '../User/Login'
import Profile from '../User/Profile'
import Register from '../User/Register'

const Wrapper = styled.div`
    p{
        margin: 0;
    }
`

const MobileUser = ({toggleLogin, user, logout, layout, background, accessToken, setLayout, setIsHovered}) => {
    const [currentFrame, setCurrentFrame] = useState('')
    
    useEffect(() => {
        if (user && accessToken){
            setCurrentFrame('profile')
        } else {
            setCurrentFrame('login')
        }

    }, [user, accessToken])

    const renderFrame = (frame) => {
        switch (frame) {
            case 'login':
                return (
                <Login
                    setCurrentFrame={setCurrentFrame}
                    setLayout={setLayout}
                    setIsHovered={setIsHovered}
                    fullWidth
                />
                )
            case 'register':
                return ( 
                <Register
                    setCurrentFrame={setCurrentFrame}
                    layout={layout}
                    background={background}
                    fullWidth
                />
                )
            case 'profile':
                return (
                <Profile
                    user={user}
                    logout={logout}
                />
                )
            default:
                break;
        }
    }

    return (
        <Wrapper>
            <Back
                withText
                width='70px'
                onClick={toggleLogin}
            />
            {renderFrame(currentFrame)}
        </Wrapper>
    )
}

export default MobileUser
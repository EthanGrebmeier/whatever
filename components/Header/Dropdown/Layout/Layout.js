import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Back from '../../../Buttons/Back'
import LayoutLoad from './LayoutLoad'
import LayoutMenu from './LayoutMenu'
import LayoutSave from './LayoutSave'

const Wrapper = styled.div`
    height: ${props => props.height};
    width: 300px;
    background: white;
    border: 2px solid black;
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column;
    padding: 40px 20px 40px 20px;
    position: relative;
    & button:not(:first-child){
        margin-top: 10px;
    }
`

const Layout = ({layout, setLayout, user, setUser}) => {
    const [frame, setFrame] = useState('menu')

    const renderFrame = (frame) => {
        if (!user){
            return (
                <p style={{textAlign: 'center'}}>
                    Sign in or create an account to save your layouts!
                </p>
            )
        }
        switch (frame) {
            case 'menu':
                return (
                    <LayoutMenu
                        layout={layout}
                        user={user}
                        setFrame={setFrame}
                    />
                )
            case 'save-new':
                return (
                    <LayoutSave
                        setFrame={setFrame}
                        user={user}
                        setUser={setUser}
                        layout={layout}
                        setLayout={setLayout}
                        new
                    />
                )
            case 'save':
                return (
                    <LayoutSave
                        setFrame={setFrame}
                        user={user}
                        setUser={setUser}
                        layout={layout}
                        setLayout={setLayout}
                    />
                )
            case 'load':
                return(
                    <LayoutLoad
                        user={user}
                        setUser={setUser}
                        layouts={user?.layoutMeta?.layouts || []}
                        layout={layout}
                        setLayout={setLayout}
                    />
                )
            default:
                break;
        }
    }

    return (
        <Wrapper>
            {frame !== 'menu' && <Back position='absolute' onClick={() => setFrame('menu')} top='5px' left='5px'  />}
            {renderFrame(frame)}
        </Wrapper>
    )
}

export default Layout
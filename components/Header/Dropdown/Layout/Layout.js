import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Back from '../../../Buttons/Back'
import LayoutLoad from './LayoutLoad'
import LayoutMenu from './LayoutMenu'
import LayoutSave from './LayoutSave'

const Wrapper = styled.div`
    height: 240px;
    width: 550px;
    background: white;
    border: 2px solid black;
    border-radius: 0 0 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    position: relative;
`

const MenuFrame = styled.div`
    width: 47%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

const Line = styled.span`
    width: 2px;
    height: 100%;
    background: black;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
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
            default:
                break;
        }
    }

    return (
        <Wrapper>
            <MenuFrame>
                <LayoutLoad
                    user={user}
                    setUser={setUser}
                    layouts={user?.layoutMeta?.layouts || []}
                    layout={layout}
                    setLayout={setLayout}
                />
            </MenuFrame>
            <Line/>
            <MenuFrame>
                {frame !== 'menu' && <Back position='absolute' onClick={() => setFrame('menu')} top='5px' left='0px'  />}
                {renderFrame(frame)}
            </MenuFrame>
        </Wrapper>
    )
}

export default Layout
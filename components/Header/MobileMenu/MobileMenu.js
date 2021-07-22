import { useState } from 'react'
import styled from 'styled-components'
import User from '../User/User'
import applets from '../../../applets/applets'
import MobileUser from './MobileUser' 
import Button from '../../Buttons/Button'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
    background: #CED0FA;
`

const MobileMenu = (props) => {

    const [login, setLogin] = useState(false)

    const toggleLogin = () => {
        setLogin(!login)
    }

    if (login) {
        return (
            <Wrapper>
                <MobileUser
                    {...props}
                    toggleLogin={toggleLogin}
                />
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div>
            {
                applets.filter((applet) => !applet.mobileOnly).map((applet) => (
                    <h1
                        key={applet.name}
                        onClick={() => {
                            props.setMobileAppletID(applet.id)
                            props.setMobileMenuOpen(false)
                        }}
                    > 
                        {applet.name} 
                    </h1>
                ))
            }
            </div>
            {
            props.user ? (
                <div>
                    <h1> {props.loading ? 'Loading...' : `${props.user.firstName} ${props.user.lastName}`} </h1>
                    <Button
                        secondary
                        onClick={props.logout}
                    >
                        Log out
                    </Button>
                </div>
            ) : props.loading ? (
                <h3>
                    Loading...
                </h3>
            ) : (
                <h3
                onClick={toggleLogin}
                > 
                    Log In 
                </h3>
                
            )
            }
        </Wrapper>    
    )
}

export default MobileMenu
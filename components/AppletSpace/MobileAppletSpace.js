import axios from 'axios'
import { useEffect } from 'react'
import styled from 'styled-components'
import { getComponent, getMobileComponentObject } from '../../applets/applets'
import { useAccessTokenContext } from '../../contexts/AccessTokenContext'
import MobileMenu from '../Header/MobileMenu/MobileMenu'

const Wrapper = styled.div`
    width: 100%;
    height: 85vh; 
    position: relative;
    padding-bottom: 10px;
`     

const MobileAppletSpace = ({user, setUser, mobileMenuOpen, setMobileMenuOpen, mobileApplet, setMobileApplet, layout, loading, setLayout, background, ...rest}) => {
    
    useEffect(() => {
        if (layout?.applets && layout.applets.length > 0){
            setMobileApplet(getMobileComponentObject(layout.applets[0].id.slice(0, -3)))
        }
    }, [])

    const accessTokenContext = useAccessTokenContext()

    const logout = async () => {
        axios.post('/api/logout')
        setUser()
        accessTokenContext.setAccessToken('')
    }

    return (
        <Wrapper>
            {getComponent(mobileApplet.id, {
                mobileApplet, 
                setMobileApplet, 
                applet: {
                    width: '100%',
                    height: '100%',
                },
                ...rest
            })}
            {
                mobileMenuOpen && (
                    <MobileMenu
                        setMobileApplet={setMobileApplet}
                        setMobileMenuOpen={setMobileMenuOpen}
                        user={user}
                        setLayout={setLayout}
                        layout={layout}
                        background={background}
                        logout={logout} 
                        accessToken={accessTokenContext.accessToken}
                        loading={loading}
                    />
                )
            }
        </Wrapper>
    )
}

export default MobileAppletSpace
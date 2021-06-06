import styled from 'styled-components'
import Applets from './Dropdown/Applets/Applets'
import HeaderDropdown from './Dropdown/HeaderDropdown'
import Layout from './Dropdown/Layout/Layout'
import { UilCog, UilUserCircle } from '@iconscout/react-unicons'
import Settings from './Settings/Settings'
import { useAccessTokenContext } from '../../contexts/AccessTokenContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
import User from './User/User'



const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 65px;
    padding: 0 10px 0 10px;
    border-radius: 10px;
    border: 2px solid black;
    
    background: white; 
    position: relative; 
    margin-bottom: 10px;
    h1{
        margin-right: 40px;
    }
    @media screen and (max-width: 850px) {
        
        h1{
            font-size: 24px;
        }
    }
`

const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

const Header = ({layout, setLayout, background, setBackground, user, setUser, loading}) => {
    
    
    const accessTokenContext = useAccessTokenContext()

    const logout = async () => {
        
        axios.post('/api/logout')
        setUser()
        accessTokenContext.setAccessToken('')
    }

    return (
        <Wrapper>
            <HeaderSection>
                <h1> Whatever </h1>
                <HeaderDropdown titleText='Layout' showCarrot={true}>
                    <Layout
                        layout={layout}
                        setLayout={setLayout}
                        user={user}
                        setUser={setUser}
                    />
                </HeaderDropdown>
                <HeaderDropdown titleText='Modules' showCarrot={true}>
                    <Applets 
                        layout={layout}
                        setLayout={setLayout}
                    />
                </HeaderDropdown>
            </HeaderSection>

            <HeaderSection>
                <HeaderDropdown titleIcon={<UilCog/>} titleText='Settings' right={'-30px'}>
                    <Settings
                        background={background}
                        setBackground={setBackground}
                    />
                </HeaderDropdown>
                <HeaderDropdown 
                    titleIcon={<UilUserCircle/>} 
                    titleText={user ? `${user?.firstName} ${user?.lastName}` : loading ? 'Loading...' : 'Sign In'} 
                    right={'0px'}
                    noMargin
                >
                    <User
                        setLayout={setLayout}
                        layout={layout}
                        background={background}
                        user={user}
                        logout={logout} 
                        accessToken={accessTokenContext.accessToken}
                        
                    />
                </HeaderDropdown>
            </HeaderSection>

        </Wrapper>
    )
}
 
export default Header
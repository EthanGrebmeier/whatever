import styled from 'styled-components'
import Applets from './Dropdown/Applets/Applets'
import HeaderDropdown from './Dropdown/HeaderDropdown'
import Layout from './Dropdown/Layout'
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
    border-radius: 10px;
    border: 2px solid black;
    background: white;
    position: relative;
    h1{
        margin-right: 40px;
        padding: 10px; 
    }
`

const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

const Header = ({layout, setLayout, background, setBackground, user, setUser}) => {
    
    
    const accessTokenContext = useAccessTokenContext()

    if (accessTokenContext.accessToken && !user){
        axios.get('/api/user', {
            headers: {
                'Authorization' : 'Bearer ' + accessTokenContext.accessToken
            }
        }).then(res => {
            setUser(res.data)
        }).catch(err => console.log(err))
    }

    const logout = () => {
        setUser()
        accessTokenContext.setAccessToken('')
        axios.post('/api/logout')
    }

    return (
        <Wrapper>
            <HeaderSection>
                <h1> Whatever </h1>
                <HeaderDropdown titleText='Layout' showCarrot={true}>
                    <Layout/>
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
                <HeaderDropdown titleIcon={<UilUserCircle/>} titleText={user && `${user?.firstName} ${user?.lastName}` || 'Sign In'} right={'-30px'}>
                    <User
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
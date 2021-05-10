import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import { useAccessTokenContext } from '../../../contexts/AccessTokenContext'
import Button from '../../Buttons/Button'
import Form from '../../Form/Form'
import Input from '../../Form/Input'
import Label from '../../Form/Label'

const RegisterButton = styled.button`
    background: none;
    border: none;
    text-decoration: underline; 
    font-family: 'Quicksand';
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
`

const Login = (props) => {
    const [inputEmail, setInputEmail] = useState('kileybrennan@gmail.com')
    const [inputPassword, setInputPassword] = useState('Ds$3023$')
    const AccessTokenContext = useAccessTokenContext()

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/login', {
            email: inputEmail,
            password: inputPassword
        }).then( res => {
            AccessTokenContext.setAccessToken(res.data.accessToken)
        }).catch( err => {
            console.log(err)
        })
    }

    return (
        <Form onSubmit={onSubmit} width='230px' height='220px'>
            <Label>
                <p> Email </p>
                <Input value={inputEmail} onChange={e => setInputEmail(e.target.value)}/>
            </Label>
            <Label showEye={true}>
                <p> Password </p>
                <Input value={inputPassword} onChange={e => setInputPassword(e.target.value)}/>
            </Label>
            <Button>
                Log In
            </Button>
            <RegisterButton type="button" onClick={() => props.setCurrentFrame('register')}>
                Register
            </RegisterButton>
        </Form>
    )
}

export default Login
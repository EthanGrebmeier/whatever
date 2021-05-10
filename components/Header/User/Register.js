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

const Register = (props) => {
    const [inputFirstName, setInputFirstName] = useState('')
    const [inputLastName, setInputLastName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const accessTokenContext = useAccessTokenContext()

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/register', {
            firstName: inputFirstName,
            lastName: inputLastName,
            email: inputEmail,
            password: inputPassword,
            layoutMeta: {
                defaultLayout: 'Default',
                layouts: [props.layout]
            },
            settings: {
                background: props.background
            }
        }).then( res => {
            accessTokenContext.setAccessToken(res.data.accessToken)
        }).catch( err => {
            console.log(err)
        })
    }

    return (
        <Form onSubmit={onSubmit} width='230px' height='320px'>
            <Label>
                <p> First Name </p>
                <Input value={inputFirstName} onChange={e => setInputFirstName(e.target.value)}/>
            </Label>
            <Label>
                <p> Last Name </p>
                <Input value={inputLastName} onChange={e => setInputLastName(e.target.value)}/>
            </Label>
            <Label>
                <p> Email </p>
                <Input value={inputEmail} onChange={e => setInputEmail(e.target.value)}/>
            </Label>
            <Label showEye={true}>
                <p> Password </p>
                <Input value={inputPassword} onChange={e => setInputPassword(e.target.value)}/>
            </Label>
            <Button>
                Register
            </Button>
            <RegisterButton type='button' onClick={() => props.setCurrentFrame('login')}>
                Already Registered?
            </RegisterButton>
        </Form>
    )
}

export default Register
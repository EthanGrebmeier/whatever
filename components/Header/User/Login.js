import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import { useAccessTokenContext } from '../../../contexts/AccessTokenContext'
import { useSnackbarContext } from '../../../contexts/SnackbarContext'
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
    const [inputEmail, setInputEmail] = useState('test@gmail.com')
    const [inputPassword, setInputPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const accessTokenContext = useAccessTokenContext()

    const snackbarContext = useSnackbarContext()

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await axios.post('/api/login', {
            email: inputEmail,
            password: inputPassword
        }).then( res => {
            props.setLayout()
            console.log(res)
            accessTokenContext.setAccessToken(res.data.accessToken)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken
            snackbarContext.setSnackbar('Logged In')
            setIsLoading(false)
            props.setIsHovered(false)
        }).catch( err => {
            console.log(err)
            snackbarContext.setSnackbar(err.response.data.message)
            setIsLoading(false)
        })
    }

    return (
        <Form onSubmit={onSubmit} width='230px' height='220px'>
            <Label>
                <p> Email </p>
                <Input value={inputEmail} onSubmit={onSubmit} onChange={e => setInputEmail(e.target.value)}/>
            </Label>
            <Label showEye={true}>
                <p> Password </p>
                <Input value={inputPassword} onSubmit={onSubmit} onChange={e => setInputPassword(e.target.value)}/>
            </Label>
            <Button
                primary
            >
                {isLoading ? 'Loading...' : 'Log In'}
            </Button>
            <Button 
                type="button" 
                onClick={() => props.setCurrentFrame('register')}
                secondary
            >
                Register
            </Button>
        </Form>
    )
}

export default Login
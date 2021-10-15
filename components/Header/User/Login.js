import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import { useAccessTokenContext } from '../../../contexts/AccessTokenContext'
import { useSnackbarContext } from '../../../contexts/SnackbarContext'
import Button from '../../Buttons/Button'
import Eyeball from '../../Form/Eyeball'
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
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const accessTokenContext = useAccessTokenContext()

    const {snackbar, setSnackbar} = useSnackbarContext()

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await axios.post('/api/login', {
            email: inputEmail,
            password: inputPassword
        }).then( res => {
            props.setLayout()
            accessTokenContext.setAccessToken(res.data.accessToken)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken
            setSnackbar('Logged In')
            setIsLoading(false)
            props.setIsHovered && props.setIsHovered(false)
        }).catch( err => {
            console.log(err)
            if (err.response){
                console.log(err.response)
                setSnackbar(err.response.data)
            }

            setIsLoading(false)
        })
    }

    return (
        <Form onSubmit={onSubmit} width={props.fullWidth ? '100%' : '230px'} height='220px'>
            <Label>
                Email 
                <Input id='email' aria-label='email' value={inputEmail} onSubmit={onSubmit} onChange={e => setInputEmail(e.target.value)}/>
            </Label>
            <Label showEye={true}>
                 Password 
                <Input 
                    aria-label='password' 
                    value={inputPassword} 
                    onSubmit={onSubmit} 
                    onChange={e => setInputPassword(e.target.value)}
                    hidePassword={!showPassword}
                />
                <Eyeball
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
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
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
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

const Register = (props) => {
    const [inputFirstName, setInputFirstName] = useState('')
    const [inputLastName, setInputLastName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const accessTokenContext = useAccessTokenContext()
    const {snackbar, setSnackbar} = useSnackbarContext()

    const checklists = useSelector(state => state.checklist.checklists)


    const onSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post('/api/register', {
            firstName: inputFirstName,
            lastName: inputLastName,
            email: inputEmail,
            password: inputPassword,
            layoutMeta: {
                defaultLayout: '',
                layouts: []
            },
            settings: {
                background: props.background
            },
            appletMeta: {
                checklist: checklists
            }
        }).then( res => {
            setIsLoading(false)
            accessTokenContext.setAccessToken(res.data.accessToken)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken
            setSnackbar('Logged in')
        }).catch( err => {
            setIsLoading(false)
            setSnackbar(err.response.data.message)
            console.log(err)
        })
    }

    return (
        <Form onSubmit={onSubmit} width={props.fullWidth ? '100%' : '230px'} height='320px'>
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
                <Input 
                    value={inputPassword} 
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
                {isLoading ? 'Loading...' : 'Register'}
            </Button>
            <RegisterButton type='button' onClick={() => props.setCurrentFrame('login')}>
                Already Registered?
            </RegisterButton>
        </Form>
    )
}

export default Register
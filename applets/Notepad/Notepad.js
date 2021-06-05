import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { UilSave, UilCheck } from '@iconscout/react-unicons'
import IconButton from '../../components/Buttons/IconButton'
import { useSnackbarContext } from '../../contexts/SnackbarContext'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchNotepadSuccess,
    updateNotes,
} from '../../redux/applets/notepad/notepadSlice'
import { useAccessTokenContext } from '../../contexts/AccessTokenContext'
import axios from 'axios'


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    background: #FFC590;
    border-radius: 0 0 10px 10px;
    transition: all .3s ease;
    display: flex;
    flex-direction: column;

    *:disabled{
        color: black;
        cursor: text;
    }

`

const Section = styled.div`
    width: 100%;
    border-bottom: 2px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TextArea = styled.textarea`
    width: 100%;
    flex-grow: 1;
    font-family: 'Quicksand';
    font-size: ${props => props.isWide ? '18px' : '16px'};
    font-weight: 500;
    background: transparent;
    border: none;
    resize: none;
`

const Title = styled.input`
    font-size: ${props => props.isWide ? '32px' : '28px'};
    width: 100%;
    font-weight: 600;
    padding: 10px 0 10px 0;
    background: transparent;
    border: none;
`

const Notepad = ({applet}) => {

    const [canSave, setCanSave] = useState(true)


    const dispatch = useDispatch()
    const accessTokenContext = useAccessTokenContext()

    let text = useSelector(state => state.notepad.text)
    let title = useSelector(state => state.notepad.title)

    let [savedText, setSavedText] = useState('')
    let [savedTitle, setSavedTitle] = useState('')

    
    useEffect(() => {
        fetchNotepadRequest()
    }, [])

    const fetchNotepadRequest = () => {
        if (accessTokenContext.accessToken){
            axios.get(process.env.NEXT_PUBLIC_URL + '/applets/notepad/').then( res => {
                dispatch(fetchNotepadSuccess(res.data.notepad))
                savedTitle = res.data.notepad.title
                savedText = res.data.notepad.text
            }).catch(err => {
                console.log(err)
            })
        } else {
            dispatch(updateNotes({
                title: 'Change Me',
                text: 'Welcome to the Notepad!'
            }))
        }
    }

    const snackbarContext = useSnackbarContext()

    const onSave = () => {
        if (!accessTokenContext.accessToken){
            return snackbarContext.setSnackbar('Please sign in to save your notes')
        }
        if (canSave){
            let error;
            axios.post(process.env.NEXT_PUBLIC_URL + '/applets/notepad/', {
                notepad: {
                    title: title,
                    text: text
                }
            }).then((res) => {
                setSavedTitle(res.data.notepad.title)
                setSavedText(res.data.notepad.text)
                
            }).catch((err) => {
                console.log(err)
                return snackbarContext.setSnackbar('Error Saving...')
            })

            if (!error){
                setCanSave(false)
                setTimeout(() => {
                    setCanSave(true)
                }, 600)
                return snackbarContext.setSnackbar('Saved Notes')
            }
        } else {
            snackbarContext.setSnackbar('There is a limit of one save per minute')
        }
    }

    return (
        <Wrapper  
        >
            <Section>
                <Title
                    isWide={applet.width == '100%'}
                    value={title}
                    onChange={(e) => {dispatch(updateNotes({title: e.target.value}))}}
                    maxLength='18'
                    disabled={applet?.meta && applet.meta.disabled}
                    as={applet?.meta ? 'div' : 'input'}
                />

                <IconButton
                tooltip={title == savedTitle && text == savedText ? 'Changes Saved' : 'Save Notes'}
                onClick={title == savedTitle && text == savedText ? undefined : onSave}
                >
                    {
                    title == savedTitle && text == savedText ? (
                        <UilCheck
                            size={applet.width == '100%' ? '32' : '24'}
                        />
                    ) : (
                        <UilSave
                            size={applet.width == '100%' ? '32' : '24'}
                            color={canSave ? 'black' : 'grey'}
                        />
                    )

                    }

                </IconButton>


            </Section>
            <TextArea
                isWide={applet.width == '100%'}
                value={text}
                onChange={(e) => {dispatch(updateNotes({text: e.target.value}))}}
                maxLength='6000'
                label='Note Input'
            >

            </TextArea>
        </Wrapper>
    )
}

export default Notepad
import { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../Buttons/Button'
import Form from '../../../Form/Form'
import Input from '../../../Form/Input'
import Label from '../../../Form/Label'
import Checkbox from '../../../Form/Checkbox'
import axios from 'axios'
import { useSnackbarContext } from '../../../../contexts/SnackbarContext'


const LayoutSave = (props) => {

    const [inputName, setInputName] = useState('')

    const snackbarContext = useSnackbarContext()


    const onSubmitNew = (e) => {
        if (!inputName){ return }
        e.preventDefault()
        let currentLayout = {...props.layout}
        currentLayout.name = inputName
        props.setLayout(currentLayout)
        axios.post(process.env.NEXT_PUBLIC_URL + '/user/layout', {
            layout: currentLayout,
        }).then( res => {
            snackbarContext.setSnackbar(`Saved ${currentLayout.name}`)
            let user = {...props.user}
            user.layoutMeta = res.data
            props.setUser(user)
            props.setFrame('menu')
        }).catch( err => {
            console.log(err)
        })
    }

    return (
        <Form onSubmit={onSubmitNew} width='100%' height='140px'>
            <Label>
                <p> Name:  </p>
                <Input
                    onChange={(e) => setInputName(e.target.value)}
                />
            </Label>
            <Button>
                Save {props.new && 'New'} Layout
            </Button>
        </Form>
    )
}

export default LayoutSave
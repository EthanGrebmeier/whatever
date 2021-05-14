import { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../Buttons/Button'
import Form from '../../../Form/Form'
import Input from '../../../Form/Input'
import Label from '../../../Form/Label'
import Checkbox from '../../../Form/Checkbox'
import axios from 'axios'


const LayoutSave = (props) => {

    const [isDefaultLayout, setIsDefaultLayout] = useState(false)
    const [inputName, setInputName] = useState('')

    const handleCheck = (e) => {
        e.target.value == 'false' ? setIsDefaultLayout(true) : setIsDefaultLayout(false)
    }

    const onSubmitNew = (e) => {
        if (!inputName){ return }
        e.preventDefault()
        let currentLayout = {...props.layout}
        currentLayout.name = inputName
        props.setLayout(currentLayout)
        axios.post(process.env.NEXT_PUBLIC_URL + '/user/layout', {
            layout: currentLayout,
            isDefault: isDefaultLayout
        }).then( res => {
            console.log(res)
            let user = {...props.user}
            user.layoutMeta = res.data
            props.setUser(user)
            props.setFrame('menu')
        }).catch( err => {
            console.log(err)
        })
    }

    const addLayoutToUser = (layout) => {

    }


    return (
        <Form onSubmit={onSubmitNew} width='100%'>
            <Label>
                <p> Name:  </p>
                <Input
                    onChange={(e) => setInputName(e.target.value)}
                />
            </Label>
            <Label flexDirection='row' width='60%'>
                <Checkbox handleChange={handleCheck} value={isDefaultLayout} />
                <p> Set as default? </p>
            </Label>
            <Button onClick={() => console.log(isDefaultLayout)}>
                Save {props.new && 'New'} Layout
            </Button>
        </Form>
    )
}

export default LayoutSave
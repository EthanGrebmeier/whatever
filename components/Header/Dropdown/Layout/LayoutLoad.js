import { useState } from 'react'
import { UilPen,UilStar, UilSave, UilTrashAlt } from '@iconscout/react-unicons'
import styled from 'styled-components'
import Button from '../../../Buttons/Button'
import Form from '../../../Form/Form'
import Input from '../../../Form/Input'
import Label from '../../../Form/Label'
import Checkbox from '../../../Form/Checkbox'
import axios from 'axios'
import IconButton from '../../../Buttons/IconButton'

const Wrapper = styled.ul`
display: flex;
flex-direction: column;
justify-content: center;
width: 100%;
height: 100%;
list-style-type: none;
padding-inline-start: 0;
overflow-y: scroll;
li:not(:first-child) {
    border-top: 1px solid black;
}
`

const Layout = styled.li`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 40px;
`

const LayoutButtons = styled.div`
width: 45%;
display: flex;
justify-content: space-between;
`

const Name = styled.p`
    & :hover{
        cursor: pointer;
        font-weight: 700;
    }
`

const Nothing = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`


const LayoutLoad = (props) => {

    const [editIndex, setEditIndex] = useState()
    const [inputNewName, setInputNewName] = useState('')

    const onSelect = async (layout) => {
        let {data} = await axios.get(process.env.NEXT_PUBLIC_URL + '/user/layout/' + layout._id)
        props.setLayout(data)
    }

    const onEdit = (layout, index) => {
        setEditIndex(index)
        setInputNewName(layout.name)
    }

    const onSave = (layout) => {
        let current = {...layout}
        current.name = inputNewName
        console.log(current)
        setEditIndex()
        setInputNewName()
        /*
        axios.put(process.env.NEXT_PUBLIC_URL + '/user/layout/' + layout._id, {
            layout: current
        }).then( res => {
            console.log(res)
            props.setUser(res.data)
        }).catch(err => console.log(err))
        */
    }

    const onFavorite = (layout) => {
        layout.isDefault = true
        axios.put(process.env.NEXT_PUBLIC_URL + '/user/layout/' + layout._id, {
            layout: current
        }).then( res => {
            console.log(res)
            let currentUser = {...user}
            currentUser.layoutMeta = res.data
            props.setUser(currentUser)
        }).catch(err => console.log(err))
    }

    const onDelete = (layout) => {
        axios.delete(process.env.NEXT_PUBLIC_URL + '/user/layout/' + layout._id, {
            layout: current
        }).then( res => {
            console.log(res)
            let currentUser = {...user}
            currentUser.layoutMeta = res.data
            props.setUser(currentUser)
        }).catch(err => console.log(err))
    }


    return (
        <>
        <p style={{borderBottom: '2px solid black'}}> Load a Layout </p>
        <Wrapper>
            
            {[{
      name: 'Default',
      applets: [
        {
          id: 'checklist'+ Math.floor(Math.random() * 800 + 100),
          name: 'Checklist',
          width: '49%',
          height: '49%',
          position: 'top left'
        },
      ]
    }].map((layout, index) => {
                return (
                    <Layout key={layout._id || layout.name}>
                        {editIndex == index ? (
                        <Input
                            value={inputNewName}
                            onChange={(e) => setInputNewName(e.target.value)}
                            onSubmit={() => onSave(layout)}
                            width='50%'
                        />
                        ) : (
                        <Name 
                        onClick={() => onSelect({...layout})}
                        > 
                            {layout.name}  
                        </Name>  
                        )}
                        <LayoutButtons>
                            {
                                editIndex == index ? (
                                <IconButton tooltip='Save Name' onClick={() => onSave(layout)}>
                                    <UilSave/>
                                </IconButton>
                                ) : (
                                <IconButton tooltip='Edit Name' onClick={() => onEdit(layout, index)}>
                                    <UilPen/>
                                </IconButton>
                                )
                            }
                            <IconButton tooltip='Set Favorite' onClick={() => onFavorite(layout)}>
                                <UilStar/>
                            </IconButton>
                            <IconButton tooltip='Delete Layout' onClick={() => onDelete(layout)}>
                                <UilTrashAlt color='black'/>
                            </IconButton>
                            
                            
                            
                            
                        </LayoutButtons>
                    </Layout>
                )
            })}
            {props.layouts.length == 0 && 
            <Nothing>
                <p> No Saved Layouts </p> 
            </Nothing>}
        </Wrapper>
        </>
    )
}

export default LayoutLoad
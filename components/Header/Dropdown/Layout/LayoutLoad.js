import { useState } from 'react'
import { UilPen,UilStar, UilSave, UilTrashAlt, UilTimes } from '@iconscout/react-unicons'
import { UisFavorite } from '@iconscout/react-unicons-solid'
import styled from 'styled-components'
import Button from '../../../Buttons/Button'
import Form from '../../../Form/Form'
import Input from '../../../Form/Input'
import Label from '../../../Form/Label'
import Checkbox from '../../../Form/Checkbox'
import axios from 'axios'
import IconButton from '../../../Buttons/IconButton'
import { useSnackbarContext } from '../../../../contexts/SnackbarContext'
import hiddenBaseLayout from '../../../../applets/hiddenBaseLayout'

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
    text-decoration: ${props => props.isSelected ? 'underline' : 'none'};

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

    let snackbarContext = useSnackbarContext()

    const onSelect = async (layout) => {
        snackbarContext.setSnackbar(`Switched to ${layout.name}`)
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
        setEditIndex()
        setInputNewName()
        
        axios.put(process.env.NEXT_PUBLIC_URL + '/user/layout/' + layout._id, {
            layout: current
        }).then( res => {
            snackbarContext.setSnackbar(`Renamed to ${inputNewName}`)
            let currentUser = {...props.user}
            currentUser.layoutMeta = res.data
            props.setUser(currentUser)
        }).catch(err => console.log(err))
        
    }

    const onFavorite = (layout) => {
        layout.isDefault = true
        axios.put(process.env.NEXT_PUBLIC_URL + '/user/layout/' + layout._id, {
            isDefault: true,
            layout: layout
        }).then( res => {
            snackbarContext.setSnackbar(`Set ${layout.name} as default layout`)
            let currentUser = {...props.user}
            currentUser.layoutMeta = res.data
            props.setUser(currentUser)
        }).catch(err => console.log(err))
    }

    const onDelete = (layout) => {
        if (props.layout._id == layout._id){
            props.setLayout(hiddenBaseLayout)
        }
        
        axios.delete(process.env.NEXT_PUBLIC_URL + '/user/layout/' + layout._id).then( res => {
            snackbarContext.setSnackbar(`Deleted ${layout.name}`)
            let currentUser = {...props.user}
            currentUser.layoutMeta = res.data
            props.setUser(currentUser)
        }).catch(err => console.log(err))
        
    }

    const onCancel = () => {
        setEditIndex()
        setInputNewName()
    }


    return (
        <>
        <p style={{borderBottom: '2px solid black'}}> Load a Layout </p>
        <Wrapper>
        
            {props?.user?.layoutMeta?.layouts && props.layout && props?.user?.layoutMeta?.layouts?.map((layout, index) => {
                return (
                    <Layout key={layout._id || layout.name}>
                        {editIndex == index ? (
                        <Input
                            value={inputNewName}
                            onChange={(e) => setInputNewName(e.target.value)}
                            onSubmit={() => onSave(layout)}
                            width='50%'
                            onKeyDown={(e) => {
                                console.log(e)
                                if (e.key == 'Escape'){
                                    onCancel()
                                }
                            } }
                            autoFocus
                        />
                        ) : (
                        <Name 
                        onClick={() => onSelect({...layout})}
                        isSelected={props.layout._id == layout._id}
                        > 
                            {layout.name}  
                        </Name>  
                        )}
                        <LayoutButtons>
                            {
                                editIndex == index ?  (
                                <IconButton tooltip='Save Name' onClick={() => onSave(layout)}>
                                    <UilSave/>
                                </IconButton>
                                ) : (
                                <IconButton tooltip='Edit Name' onClick={() => onEdit(layout, index)}>
                                    <UilPen/>
                                </IconButton>
                                )
                            }

                            {
                            editIndex != index && (
                            <IconButton tooltip='Set Favorite' onClick={() => onFavorite(layout)}>
                                {props.user?.layoutMeta?.defaultLayout == layout._id ? (
                                    <UisFavorite/>
                                ) : (
                                    <UilStar/>
                                )}
                            </IconButton>
                            )
                            }

                            {
                            editIndex == index ? (
                            <IconButton tooltip='Cancel Edit' onClick={onCancel} >
                                <UilTimes/>
                            </IconButton>
                            ) : (
                            <IconButton tooltip='Delete Layout' onClick={() => onDelete(layout)}>
                                <UilTrashAlt color='black'/>
                            </IconButton>
                            )
                            }
                            
                            
                            
                            
                            
                            
                        </LayoutButtons>
                    </Layout>
                )
            })}
            {props.layouts && props.layouts.length == 0 && 
            <Nothing>
                <p> No Saved Layouts </p> 
            </Nothing>}
        </Wrapper>
        </>
    )
}

export default LayoutLoad
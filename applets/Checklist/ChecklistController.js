import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchChecklistsBegin,
    fetchChecklistsSuccess,
    createChecklist,
    deleteChecklist,
    checkItem, 
    completeItem, 
    createItem, 
    deleteItem, 
    deleteAllItems 
} from '../../redux/applets/checklist/checklistSlice'
import Checklist from "./Checklist"
import {useAccessTokenContext} from '../../contexts/AccessTokenContext'
import { useSnackbarContext } from "../../contexts/SnackbarContext"
import styled from "styled-components"
import ChecklistMenu from "./ChecklistMenu"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.background};
    border-radius: 0 -0 10px 10px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;

    * {
        transition: all .2s ease;
    }
    
    h2 {
        font-size: ${props => props.isWide ? '32px' : '24px'};
        @media screen and (max-width: 740px){
            font-size: ${props => props.isWide ? '18px' : '16px'};
        }
    }

    h3{
        @media screen and (max-width: 740px){
            font-size: ${props => props.isWide ? '14px' : '12px'};
        }
    }

    ul{
        list-style-type: none;
        padding-inline-start: 0;
        overflow-y: scroll;
        flex-grow: 2;
        width: 100%;
    }

    p {
        font-size: ${props => props.isWide ? '24px' : '16px'};
        @media screen and (max-width: 740px){
            font-size: ${props => props.isWide ? '14px' : '12px'};
        }
    }

    @media screen and (max-width: 740px){
        padding: 0;
    }

`

const ChecklistController = ({applet}) => {
    
    const checklistRef = useRef(null)
    const dispatch = useDispatch()
    const accessTokenContext = useAccessTokenContext()
    const snackbarContext = useSnackbarContext()
    const checklists = useSelector(state => state.checklist.checklists)
    const [selectedChecklistID, setSelectedChecklistID] = useState('')

    useEffect(() => {
        if (accessTokenContext.accessToken){
            fetchItemsRequest()
            fetchChecklistsRequest()
        } else {
            //setSelectedChecklistID('default')
            dispatch(fetchChecklistsSuccess({
                'default': {
                    _id: 'default',
                    name: 'default',
                    items: []
                }
            }))
        }
    }, [accessTokenContext.accessToken])

    const fetchChecklistsRequest = () => {
        axios.get(process.env.NEXT_PUBLIC_URL + '/applets/checklist').then(res => {
            dispatch(fetchChecklistsSuccess(res.data.checklists))
        }).catch(err => console.log(err))
    }

    const postNewItemRequest = async (item) => {
        if (accessTokenContext.accessToken){
            axios.post(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + selectedChecklistID + '/item/', {
                item: {
                    ...item,
                    isCompleted: false,
                    isChecked: false
                }
            }).then(res => {
                dispatch(createItem({
                    item: res.data.item,
                    checklistID: selectedChecklistId
                }))
                snackbarContext.setSnackbar(`${res.data.item.title} created`)
            }).catch(err => {
                console.log(err)
                snackbarContext.setSnackbar('Something went wrong')
            })
        } else {
            dispatch(createItem({
                checklistID: 'default',
                item: {
                    ...item,
                    _id: Math.floor(Math.random() * 800 + 100),
                    isCompleted: false,
                    isChecked: false
                }
            }))
            snackbarContext.setSnackbar(`${item.title} created`)
        }
    }

    const putCompletedItemRequest = async (item) => {
        if (accessTokenContext.accessToken){
            axios.put(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + selectedChecklistID + '/item/' + item._id, {
                item: {
                    ...item,
                    isCompleted: !item.isCompleted,
                    isChecked: !item.isChecked
                }
            }).catch(err => console.log(err))
        }
        dispatch(completeItem({
            item,
            checklistID: selectedChecklistID
        }))
    }

    const checkItemWrapper = (item) => {
        dispatch(checkItem({
            item,
            checklistID: selectedChecklistID
        }))
    }

    const deleteItemRequest = async (item) => {
        if (accessTokenContext.accessToken){
            axios.delete(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + selectedChecklistID + '/item/' + item._id).then(res => {
                dispatch(deleteItem(item))
            }).catch(err => console.log(err))
        } else {
            dispatch(deleteItem({
                item,
                checklistID: selectedChecklistID
            }))
        }
    }

    const deleteCompletedRequest = async () => {
        if (accessTokenContext.accessToken){
            axios.delete(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + selectedChecklistID).then(res => {
                dispatch(deleteAllItems({
                    checklistID: selectedChecklistID
                }))
            }).catch(err => console.log(err))
        } else {
            dispatch(deleteAllItems({
                checklistID: selectedChecklistID
            }))
        }
    }

    const postNewChecklist = async (checklist) => {
        axios.post(process.env.NEXT_PUBLIC_URL + '/applets/checklist/', checklist).then(res => {
            dispatch(createChecklist(res.data.checklist))
        }).catch(err => console.log(err))
    }

    const editChecklist = async (checklist) => {
        axios.put(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + checklist._id).then(res => {
            dispatch(updateChecklist(res.data.checklist))
        }).catch(err => console.log(err))
    }


    return (
        <Wrapper
            isWide={applet.width === '100%'}
            isTall={applet.height === '100%'}
            background={applet.background}
            ref={checklistRef}
        >
            {selectedChecklistID ? (
            <Checklist
                applet={applet}
                items={checklists[selectedChecklistID].items}
                checkItem={checkItemWrapper}
                completeItem={putCompletedItemRequest}
                createItem={postNewItemRequest}
                deleteItem={deleteItemRequest}
                deleteAllItems={deleteCompletedRequest}
                checklistRef={checklistRef}
            />   
            ) : (    
            <ChecklistMenu
                submitNewChecklist={postNewChecklist}
                setSelectedChecklistID={setSelectedChecklistID}
                checklists={checklists}
            />
            )}
        </Wrapper>

    )
}

export default ChecklistController
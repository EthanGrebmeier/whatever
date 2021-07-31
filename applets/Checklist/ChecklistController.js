import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {
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
import mongoose  from "mongoose"

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
            font-size: 18px;
        }
    }

    @media screen and (max-width: 740px){
        padding: 0;
    }
`

const getChecklistIndex = (selectedChecklistID, checklists) => {
    for (let i in checklists){
        if (checklists[i]._id == selectedChecklistID){
            return i
        }
    }
    return false
}

const ChecklistController = ({applet, updateApplet, mobileApplet, isMobile}) => {
    
    const dispatch = useDispatch()
    const accessTokenContext = useAccessTokenContext()
    const snackbarContext = useSnackbarContext()
    const checklists = useSelector(state => state.checklist.checklists)
    const [selectedChecklistID, setSelectedChecklistID] = useState('')

    useEffect(() => {
        if (accessTokenContext.accessToken){
            fetchChecklistsRequest()
        } else {
            dispatch(fetchChecklistsSuccess({checklists: []}))
        }
    }, [accessTokenContext.accessToken])

    useEffect(() => {
        let newApplet = isMobile ? mobileApplet : applet
        if (selectedChecklistID) {
            updateApplet(applet.position, {
                ...newApplet, 
                name: checklists.filter((checklist) => checklist._id == selectedChecklistID)[0].name
            })
            console.log(checklists)
        } else {
            updateApplet(applet.position, {
                ...newApplet,
                name: 'Checklist'
            })
        }
    }, [selectedChecklistID])

    const fetchChecklistsRequest = () => {
        axios.get(process.env.NEXT_PUBLIC_URL + '/applets/checklist').then(res => {
            dispatch(fetchChecklistsSuccess({checklists: res.data.checklists}))
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
                console.log(checklists)
                dispatch(createItem({
                    item: res.data.item,
                    checklistID: selectedChecklistID
                }))
                snackbarContext.setSnackbar(`${res.data.item.title} created`)
            }).catch(err => {
                console.log(err)
                snackbarContext.setSnackbar('Something went wrong')
            })
        } else {
            let newItemID = new mongoose.Types.ObjectId()
            let idString = newItemID.toString()
            dispatch(createItem({
                checklistID: selectedChecklistID,
                item: {
                    ...item,
                    _id: idString,
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
        console.log(item)
        if (accessTokenContext.accessToken){
            axios.delete(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + selectedChecklistID + '/item/' + item._id).then(res => {
                dispatch(deleteItem({
                    item,
                    checklistID: selectedChecklistID
                }))
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
            axios.delete(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + selectedChecklistID + '/item').then(res => {
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
        if (accessTokenContext.accessToken){
            axios.post(process.env.NEXT_PUBLIC_URL + '/applets/checklist/', checklist).then(res => {
                console.log(res.data)
                dispatch(createChecklist(res.data))
            }).catch(err => console.log(err))
        } else {
            let newCheckListID = new mongoose.Types.ObjectId()
            let idString = newCheckListID.toString()
            dispatch(createChecklist({
                checklist: {
                    name: checklist.name,
                    _id: idString,
                    items: []
                }
            }))
            console.log(checklist)
        }
    }

    const deleteChecklistRequest = async (checklist) => {
        if (accessTokenContext.accessToken){
            axios.delete(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + checklist._id).then(res => {
                dispatch(deleteChecklist({
                    checklistID: checklist._id
                }))
                snackbarContext.setSnackbar('Deleted ' + checklist.name)
            }).catch(err => console.log(err))
        } else {
            dispatch(deleteChecklist({
                checklistID: checklist._id
            }))
        }
    }

    const editChecklist = async (checklist) => {
        axios.put(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + checklist._id).then(res => {
            dispatch(updateChecklist(res.data))
        }).catch(err => console.log(err))
    }


    return (
        <Wrapper
            isWide={applet.width === '100%'}
            isTall={applet.height === '100%'}
            background={applet.background}
        >
            {selectedChecklistID ? (
            <Checklist
                applet={applet}
                items={checklists[getChecklistIndex(selectedChecklistID, checklists)].items}
                checkItem={checkItemWrapper}
                completeItem={putCompletedItemRequest}
                createItem={postNewItemRequest}
                deleteItem={deleteItemRequest}
                deleteAllItems={deleteCompletedRequest}
                exitChecklist={() => setSelectedChecklistID('')}
            />   
            ) : (    
            <ChecklistMenu
                submitNewChecklist={postNewChecklist}
                setSelectedChecklistID={setSelectedChecklistID}
                checklists={checklists}
                deleteChecklist={deleteChecklistRequest}
            />
            )}
        </Wrapper>

    )
}

export default ChecklistController
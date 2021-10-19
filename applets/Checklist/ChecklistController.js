import axios from "axios"
import { useEffect, useState } from "react"
import Checklist from "./Checklist"
import {useAccessTokenContext} from '../../contexts/AccessTokenContext'
import { useSnackbarContext } from "../../contexts/SnackbarContext"
import styled from "styled-components"
import ChecklistMenu from "./ChecklistMenu"
import mongoose  from "mongoose"
import { useChecklistContext } from "../../contexts/AppletContext/ChecklistContext"

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

const getChecklistIndex = (selectedChecklist, checklists) => {
    for (let i in checklists){
        if (checklists[i]._id == selectedChecklist._id){
            return i
        }
    }
    return false
}

const ChecklistController = ({applet, updateApplet, mobileApplet, isMobile}) => {
    
    const accessTokenContext = useAccessTokenContext()
    const {snackbar, setSnackbar} = useSnackbarContext()
    const {
        checklists, 
        setChecklists,
        fetchChecklistsSuccess,
        createChecklist,
        deleteChecklist,
        checkItem,
        completeItem,
        createItem,
        deleteItem,
        deleteAllItems
    } = useChecklistContext()
    const [selectedChecklist, setSelectedChecklist] = useState({})

    useEffect(() => {
        console.log(snackbar)
        if (accessTokenContext.accessToken){
            fetchChecklistsRequest()
        }
    }, [accessTokenContext.accessToken])

    useEffect(() => {
        let newApplet = isMobile ? mobileApplet : applet
        console.log(selectedChecklist)
        console.log(Object.keys(selectedChecklist))
        if (Object.keys(selectedChecklist).length > 0) {
            updateApplet(applet.position, {
                ...newApplet, 
                name: checklists.filter((checklist) => checklist._id == selectedChecklist._id)[0].name
            })
        } else {
            updateApplet(applet.position, {
                ...newApplet,
                name: 'Checklist'
            })
        }
    }, [selectedChecklist])

    const fetchChecklistsRequest = () => {
        axios.get(process.env.NEXT_PUBLIC_URL + '/applets/checklist').then(res => {
            fetchChecklistsSuccess({checklists: res.data.checklists})
        }).catch(err => console.log(err))
    }

    const postNewItemRequest = async (item) => {
        if (accessTokenContext.accessToken){
            axios.post(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + selectedChecklist._id + '/item/', {
                item: {
                    ...item,
                    isCompleted: false,
                    isChecked: false
                }
            }).then(res => {
                createItem({
                    item: res.data.item,
                    checklist: selectedChecklist
                })
                setSnackbar(`${res.data.item.title} created`)
            }).catch(err => {
                console.log(err)
                setSnackbar('Something went wrong')
            })
        } else {
            let newItemID = new mongoose.Types.ObjectId()
            let idString = newItemID.toString()
            createItem({
                checklist: selectedChecklist,
                item: {
                    ...item,
                    _id: idString,
                    isCompleted: false,
                    isChecked: false
                }
            })
            setSnackbar(`${item.title} created`)
        }
    }

    const putCompletedItemRequest = async (item) => {
        if (accessTokenContext.accessToken){
            axios.put(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + selectedChecklist._id + '/item/' + item._id, {
                item: {
                    ...item,
                    isCompleted: !item.isCompleted,
                    isChecked: !item.isChecked
                }
            }).catch(err => console.log(err))
        }
        completeItem({
            item,
            checklist: selectedChecklist
        })
    }

    const checkItemWrapper = (item) => {
        checkItem({
            item,
            checklist: selectedChecklist
        })
    }

    const deleteItemRequest = async (item) => {
        console.log(item)
        if (accessTokenContext.accessToken){
            axios.delete(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + selectedChecklist._id + '/item/' + item._id).then(res => {
                deleteItem({
                    item,
                    checklist: selectedChecklist
                })
            }).catch(err => console.log(err))
        } else {
            deleteItem({
                item,
                checklist: selectedChecklist
            })
        }
    }

    const deleteCompletedRequest = async () => {
        if (accessTokenContext.accessToken){
            axios.delete(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + selectedChecklist._id + '/item').then(res => {
                deleteAllItems({
                    checklist: selectedChecklist
                })
            }).catch(err => console.log(err))
        } else {
            deleteAllItems({
                checklist: selectedChecklist
            })
        }
    }

    const postNewChecklist = async (checklist) => {
        if (accessTokenContext.accessToken){
            axios.post(process.env.NEXT_PUBLIC_URL + '/applets/checklist/', checklist).then(res => {
                createChecklist({checklist: res.data.checklist})
            }).catch(err => console.log(err))
        } else {
            let newCheckListID = new mongoose.Types.ObjectId()
            let idString = newCheckListID.toString()
            createChecklist({
                checklist: {
                    name: checklist.name,
                    _id: idString,
                    items: []
                }
            })
        }
    }

    const deleteChecklistRequest = async (checklist) => {
        if (accessTokenContext.accessToken){
            axios.delete(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + checklist._id).then(res => {
                deleteChecklist({checklist})
                setSnackbar('Deleted ' + checklist.name)
            }).catch(err => console.log(err))
        } else {
            deleteChecklist({checklist: checklist})
        }
    }

    return (
        <Wrapper
            isWide={applet.width === '100%'}
            isTall={applet.height === '100%'}
            background={applet.background}
        >
            {Object.keys(selectedChecklist).length > 0 ? (
            <Checklist
                applet={applet}
                items={checklists[getChecklistIndex(selectedChecklist, checklists)].items}
                checkItem={checkItemWrapper}
                completeItem={putCompletedItemRequest}
                createItem={postNewItemRequest}
                deleteItem={deleteItemRequest}
                deleteAllItems={deleteCompletedRequest}
                exitChecklist={() => setSelectedChecklist({})}
            />   
            ) : (    
            <ChecklistMenu
                submitNewChecklist={postNewChecklist}
                setSelectedChecklist={setSelectedChecklist}
                checklists={checklists}
                deleteChecklist={deleteChecklistRequest}
            />
            )}
        </Wrapper>

    )
}

export default ChecklistController
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchItemsBegin,
    fetchItemsSuccess,
    fetchItemsFailure,
    checkItem, 
    completeItem, 
    createItem, 
    deleteItem, 
    deleteAllItems
} from '../../redux/applets/checklist/checklistSlice'
import Checklist from "./Checklist"
import {useAccessTokenContext} from '../../contexts/AccessTokenContext'
import { useSnackbarContext } from "../../contexts/SnackbarContext"

const ChecklistController = ({applet}) => {

    const items = useSelector(state => state.checklist.items)
    const dispatch = useDispatch()
    const accessTokenContext = useAccessTokenContext()
    const snackbarContext = useSnackbarContext()

    useEffect(() => {
        fetchItemsRequest()
    }, [])

    useEffect(() => {
        console.log(accessTokenContext)
        if (accessTokenContext.accessToken){
            fetchItemsRequest()
        } else {
            dispatch(fetchItemsSuccess([]))
        }
        
    }, [accessTokenContext.accessToken])

    const fetchItemsRequest = () => {
        if (accessTokenContext.accessToken){
            dispatch(fetchItemsBegin())
            axios.get(process.env.NEXT_PUBLIC_URL + '/applets/checklist/').then( res => {
                dispatch(fetchItemsSuccess(res.data.items))
            }).catch(err => {
                console.log(err)
                dispatch(fetchItemsFailure(err))
            })
        }
    }

    const postNewItemRequest = async (item) => {
        if (accessTokenContext.accessToken){
            axios.post(process.env.NEXT_PUBLIC_URL + '/applets/checklist/', {
                item: {
                    ...item,
                    isCompleted: false,
                    isChecked: false
                }
            }).then(res => {
                dispatch(createItem(res.data))
                snackbarContext.setSnackbar(`${res.data.title} created`)
            }).catch(err => {
                console.log(err)
                snackbarContext.setSnackbar('Something went wrong')
            })
        } else {
            dispatch(createItem({
                ...item,
                isCompleted: false,
                isChecked: false,
                _id: Math.floor(Math.random() * 800 + 100)
            }))
            snackbarContext.setSnackbar(`${item.title} created`)
        }

    }

    const putCompletedItemRequest = async (item) => {
        if (accessTokenContext.accessToken){
            axios.put(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + item._id, {
                item: {
                    ...item,
                    isCompleted: !item.isCompleted,
                    isChecked: !item.isChecked
                }
            }).catch(err => console.log(err))
        }
        dispatch(completeItem(item))
    }

    const deleteItemRequest = async (item) => {
        if (accessTokenContext.accessToken){
            axios.delete(process.env.NEXT_PUBLIC_URL + '/applets/checklist/' + item._id).then(res => {
                dispatch(deleteItem(item))
            }).catch(err => console.log(err))
        } else {
            dispatch(deleteItem(item))
        }
    }

    const deleteCompletedRequest = async (item) => {
        if (accessTokenContext.accessToken){
            axios.delete(process.env.NEXT_PUBLIC_URL + '/applets/checklist/').then(res => {
                dispatch(deleteAllItems(item))
            }).catch(err => console.log(err))
        } else {
            dispatch(deleteAllItems(item))
        }
    }


    return (
        <Checklist
            applet={applet}
            isWide={applet.width === '100%'}
            isTall={applet.height === '100%'}
            items={items}
            checkItem={(args) => dispatch(checkItem(args))}
            completeItem={putCompletedItemRequest}
            createItem={postNewItemRequest}
            deleteItem={deleteItemRequest}
            deleteAllItems={deleteCompletedRequest}
        />
    )
}

export default ChecklistController
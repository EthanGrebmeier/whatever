import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {checkItem, completeItem, createItem} from '../../redux/applets/checklist/checklistSlice'
import Checklist from "./Checklist"

const ChecklistController = ({applet}) => {

    const items = useSelector(state => state.checklist.items)
    const dispatch = useDispatch()

    console.log(items)

    return (
        <Checklist
            applet={applet}
            isWide={applet.width === '100%'}
            isTall={applet.height === '100%'}
            items={items}
            checkItem={(args) => dispatch(checkItem(args))}
            completeItem={(args) => dispatch(completeItem(args))}
            createItem={(args) => dispatch(createItem(args))}
        />
    )
}

export default ChecklistController
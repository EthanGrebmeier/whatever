import { useEffect, useRef, useState } from 'react'
import { UilRotate360, UilTimes, UilAngleDown, UilAngleUp } from '@iconscout/react-unicons'
import styled from 'styled-components'
import { useSnackbarContext } from '../../contexts/SnackbarContext'
import Item from './Item'
import IconButton from '../../components/Buttons/IconButton'
import ChecklistForm from './ChecklistForm'
import Back from '../../components/Buttons/Back'

const HeaderSection = styled.span`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid black;
`

export const Section = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${props => props.width || '60%'};
    min-width: ${props => props.minWidth};
    max-width: ${props => props.maxWidth};
    position: relative;
    @media screen and (max-width: 740px){
        width: ${props => props.mobileWidth};
    }
`

const SortButton = styled.button`
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Quicksand';
    cursor: pointer;
    height: 26px;
    padding: 0;
`

export const MenuButton = styled.button`
    display: ${props => props.hidden ? 'none' : 'flex'};
    cursor: pointer;
    font-family: 'Quicksand';
    background: none;
    border: none;
    font-size: ${props => props.isWide ? '24px' : '16px'};
    padding: 10px 0 10px 0;
    transition: none;
    font-weight: 500;
    :hover{
        text-decoration: underline;
    }

    @media screen and (max-width: 740px){
        font-size: ${props => props.isWide ? '16px' : '14px'};
    }
`


const Checklist = ({applet, items, checkItem, completeItem, createItem, deleteItem, deleteAllItems, isWide, isTall, exitChecklist}) => {

    const [shownItems, setShownItems] = useState('incomplete')
    const [sortBy, setSortBy] = useState('')
    const [showChecklistForm, setShowChecklistForm] = useState(false)
    const [inputItemTitle, setInputItemTitle] = useState('')
    const [inputItemDate, setInputItemDate] = useState('')
    const snackbarContext = useSnackbarContext()
    const checklistRef = useRef(null)

    const submitForm = () =>{
        if (!inputItemTitle){
            return snackbarContext.setSnackbar('Item Name Required')
        }
        createItem({
            title: inputItemTitle,
            date: inputItemDate ? new Date(inputItemDate) : '',
        })
    }

    const toggleForm = () => {
        setInputItemDate('')
        setInputItemTitle('')
    }

    const closeForm = () => {
        setShowChecklistForm(false)
        toggleForm()
    }

    const sortItems = (items) => {
        let sortedItems = [...items]
        switch (sortBy) {
            case 'date-ascending':
                return sortedItems.sort((a, b) => (new Date(a.date || 'Jan 1 2012')) - (new Date(b.date || 'Jan 1 2012')));
            case 'date-descending':
                return sortedItems.sort((a, b) => (new Date(b.date || 'Jan 1 2012')) - (new Date(a.date || 'Jan 1 2012')));
            case 'complete-ascending':
                return sortedItems.sort((a, b) => a.isCompleted - b.isCompleted)
            case 'complete-descending':
                return sortedItems.sort((a, b) => b.isCompleted - a.isCompleted)
            case 'title-ascending':
                return sortedItems.sort((a, b) => a.title.localeCompare(b.title))
            case 'title-descending':
                return sortedItems.sort((a, b) => b.title.localeCompare(a.title))
            default:
                return items;
        }
    }

    const onNameClick = () => {
        if (sortBy == 'title-ascending'){
            setSortBy('title-descending')
        } else if (sortBy == 'title-descending'){
            setSortBy('')
        } else {
            setSortBy('title-ascending')
        }
    }

    const onDateClick = () => {
        if (sortBy == 'date-ascending'){
            setSortBy('date-descending')
        } else if (sortBy == 'date-descending'){
            setSortBy('')
        } else {
            setSortBy('date-ascending')
        }
    }

    const onCompleteClick = () => {
        if (sortBy == 'complete-ascending'){
            setSortBy('complete-descending')
        } else if (sortBy == 'complete-descending'){
            setSortBy('')
        } else {
            setSortBy('complete-ascending')
        }
    }

    const renderItems = () => {
        if (!items) {
            return
        }

        let filteredItems

        if (shownItems == 'all'){
            filteredItems = items
        } else if (shownItems == 'complete'){
            filteredItems = items.filter((item) => item.isCompleted)
        } else if (shownItems =='incomplete') {
            filteredItems = items.filter((item) => !item.isCompleted)
        }

        filteredItems = sortItems(filteredItems)

        return filteredItems && filteredItems.map( (item, index) => (
            <Item
                key={item._id}
                item={item}
                checkItem={checkItem}
                completeItem={completeItem}
                deleteItem={deleteItem}
                isWide={isWide}
                isTall={isTall}
            />
        ))
    }

    const cycleLists = () => {
        if (shownItems == 'all' ){
            setShownItems('incomplete')
        } else if (shownItems == 'incomplete'){
            setShownItems('complete')
        } else {
            setShownItems('all')
        }
    }

    return (
        <>  
            <Section width='100%'
                ref={checklistRef}
            >
                <Section 
                    width={isWide ? '22%' : '36%'}
                    mobileWidth='60%'
                >
                    <h2> {shownItems == 'all' ? 'All Items' : shownItems == 'incomplete' ? 'Incomplete Items' : 'Complete Items'} </h2>
                    <IconButton 
                        onClick={cycleLists}
                        tooltip={`View ${shownItems == 'all' ? 'Incomplete' : shownItems == 'incomplete' ? 'Complete' : 'All'} Items`}
                    >
                        <UilRotate360
                            size='28'
                        />
                    </IconButton>
                </Section>
                <Back
                    onClick={exitChecklist}
                    withText
                />
            </Section>

            <Section width='100%'>
                {
                showChecklistForm ? (
                    <ChecklistForm
                        submitForm={submitForm}
                        inputTitle={inputItemTitle}
                        setInputTitle={setInputItemTitle}
                        inputDate={inputItemDate}
                        setInputDate={setInputItemDate}
                        isWide={isWide}
                        toggleForm={toggleForm}
                        closeForm={closeForm}
                        hidden={!showChecklistForm}
                    />
                ) : (
                    <MenuButton 
                        isWide={isWide} 
                        onClick={() => {
                            setShowChecklistForm(true)
                        }}
                        hidden={showChecklistForm}
                    > 
                        + Create Item 
                    </MenuButton> 
                )
                }
                {
                shownItems == 'complete' && !showChecklistForm && (
                <MenuButton 
                    isWide={isWide} 
                    onClick={deleteAllItems}
                > 
                    Delete Completed Items 
                </MenuButton> 
                )
                }
            </Section>

            <HeaderSection>
                <Section>
                    <Section width={isWide ? '40%' : '60%'}>
                        <SortButton onClick={onNameClick}>
                            <h3> Title </h3> 
                            {
                                sortBy == 'title-descending' && <UilAngleUp/>
                            }
                            {
                                sortBy == 'title-ascending' && <UilAngleDown/>
                            }
                        </SortButton>
                    </Section>
                    <SortButton onClick={onDateClick}>
                        <h3>  Date </h3> 
                        {
                            sortBy == 'date-descending' && <UilAngleUp/>
                        }
                        {
                            sortBy == 'date-ascending' && <UilAngleDown/>
                        }
                    </SortButton>
                    
                </Section>
                <SortButton onClick={onCompleteClick}>
                    <h3> Complete </h3>
                    {
                        sortBy == 'complete-descending' && <UilAngleUp/>
                    }
                    {
                        sortBy == 'complete-ascending' && <UilAngleDown/>
                    }
                </SortButton>
                
            </HeaderSection>


            <ul>
                {renderItems()}
            </ul>

        </>
    )
}

export default Checklist
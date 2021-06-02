import { useEffect, useRef, useState } from 'react'
import { UilRotate360, UilTimes, UilAngleDown, UilAngleUp } from '@iconscout/react-unicons'
import styled from 'styled-components'
import Button from '../../components/Buttons/Button'
import Input from '../../components/Form/Input'
import { useSnackbarContext } from '../../contexts/SnackbarContext'
import Item from './Item'
import IconButton from '../../components/Buttons/IconButton'
import NewItemForm from './NewItemForm'


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: #77BA99;
    border-radius: 0 -0 10px 10px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;

    *::-webkit-scrollbar {
        width: 5px;               
      }
      
    *::-webkit-scrollbar-track {
        background: none;        
    }

    *::-webkit-scrollbar-thumb {
        background-color: none;    
        border-radius: 50px;      
        border: 2px solid black;  
      }

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

`

const Title = styled.h2`
`

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
    position: relative;
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

const NewItem = styled.button`
    cursor: pointer;
    font-family: 'Quicksand';
    background: none;
    border: none;
    font-size: ${props => props.isWide ? '24px' : '16px'};
    padding: 10px 0 10px 0;
    transition: none;
    font-weight: 500;
    :hover{
        font-weight: 700;
    }

    @media screen and (max-width: 740px){
        font-size: ${props => props.isWide ? '16px' : '14px'};
    }
`


const Checklist = ({applet, items, checkItem, completeItem, createItem, isWide, isTall}) => {

    const [shownItems, setShownItems] = useState('complete')
    const [sortBy, setSortBy] = useState('complete-descending')
    const [showNewItemForm, setShowNewItemForm] = useState(false)
    const [inputItemTitle, setInputItemTitle] = useState('')
    const [inputItemDate, setInputItemDate] = useState('')

    const snackbarContext = useSnackbarContext()
    
    const submitForm = () =>{
        if (!inputItemTitle){
            return snackbarContext.setSnackbar('Item Name Required')
        }
        createItem({
            title: inputItemTitle,
            date: inputItemDate ? new Date(inputItemDate) : '',
            id: Math.floor(Math.random() * 899999 + 100000)
        }, 0)
        closeForm()
    }

    const closeForm = () => {
        setInputItemDate('')
        setInputItemTitle('')
        setShowNewItemForm(false)
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
                key={item.id}
                item={item}
                checkItem={checkItem}
                completeItem={completeItem}
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
        <Wrapper
            isWide={isWide}
            isTall={isTall}
        >
            <Section width={isWide ? '22%' : '36%'} >
                <h2> {shownItems == 'all' ? 'All Items' : shownItems == 'incomplete' ? 'Incomplete Items' : 'Complete Items'} </h2>
                <IconButton 
                    onClick={cycleLists}
                    tooltip={`View ${shownItems == 'all' ? 'Incomplete' : shownItems == 'incomplete' ? 'Complete' : 'All'} Items`}
                >
                    <UilRotate360/>
                </IconButton>
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
            
            {
            showNewItemForm ? (
                <NewItemForm
                    submitForm={submitForm}
                    inputItemTitle={inputItemTitle}
                    setInputItemTitle={setInputItemTitle}
                    inputItemDate={inputItemDate}
                    setInputItemDate={setInputItemDate}
                    isWide={isWide}
                    closeForm={closeForm}
                />
            ) : (
                <NewItem 
                    isWide={isWide} 
                    onClick={() => {
                        setShowNewItemForm(true)
                    }}
                > 
                    + Create Item 
                </NewItem> 
            )
            }

            <ul>
                {renderItems()}
            </ul>

        </Wrapper>
    )
}

export default Checklist
import { useState } from 'react'
import styled from 'styled-components'
import { useSnackbarContext } from '../../contexts/SnackbarContext'
import {Section} from './Checklist'

const Wrapper = styled.li`
    padding: ${props => props.isWide ? '5px 0 5px 0' : '7px 0 7px 0'};
    display: flex;
    align-items: center;
    justify-content: space-between;

`

const Checkbox = styled.button`
    background: ${props => props.isChecked ? 'black' : 'none'};
    background-size: 10%;
    width: ${props => props.isWide ? '24px' : '16px'};
    height: ${props => props.isWide ? '24px' : '16px'};
    border: 2px solid black;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
    @media screen and (min-width: 741px){
        :hover{
            background: ${props => props.isChecked ? 'none' : 'black'};
        }
    }
    @media screen and (max-width: 740px){
        width: 14px;
        height: 14px;
    }
`

const Line = styled.span`
    position: absolute;
    width: ${props => props.isChecked ? '100%' : '0'};
    height: 2px;
    background: black;
    top: 50%;
    transform: tranlateY(-50%);
    left: 0;
    border-top: 2px solid black;
    transition: width .4s ease-out;
`


const Item = ({item, isWide, isTall, checkItem, completeItem}) => {

    const [timeouts, setTimeouts] = useState([])

    const snackbarContext = useSnackbarContext()

    const getDateString = (date) => {
        return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`
    }

    const handleChecked = () => {
        if (!item.isChecked || (item.isCompleted && item.isChecked)){
            let currentTimeouts = [...timeouts]
            currentTimeouts.push(setTimeout(() => {
                completeItem(item)
            }, 2000))
            setTimeouts(currentTimeouts)
        } else {
            for (let timeout in timeouts){
                console.log(timeouts[timeout])
                clearTimeout(timeouts[timeout])
            }
            setTimeouts([])
        }
        
        checkItem(item)
    }

    return (
        <Wrapper
            isWide={isWide}
        >
            <Section>
                    <p>

                        {item.title}
                    </p>
                {
                item.date && (
                    <p>
                        {getDateString(new Date(item.date))}
                    </p>
                )
                }

                <Line
                    isChecked={item.isChecked}
                />
            </Section>

            <Checkbox
                isChecked={item.isChecked}
                isWide={isWide}
                isTall={isTall}
                onClick={handleChecked}
            />
        </Wrapper>
    )
}

export default Item
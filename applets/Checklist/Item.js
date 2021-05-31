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
    :hover{
        background: ${props => props.isChecked ? 'none' : 'black'};
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


const Item = ({task, isWide, isTall, index, onClick, createTask, moveTask, complete}) => {

    const [isChecked, setIsChecked] = useState(complete || false)
    const [timeouts, setTimeouts] = useState([])

    const snackbarContext = useSnackbarContext()

    const getDateString = (date) => {
        return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`
    }

    const handleChecked = () => {
        console.log(task)
        console.log(index)
        if (!isChecked || (complete && isChecked)){
            let currentTimeouts = [...timeouts]
            currentTimeouts.push(setTimeout(() => {
                onClick(task)
                if (!complete){
                    snackbarContext.setSnackbar(`Completed ${task.title}`, 'Undo', () => {createTask(task, index)} )
                } else {
                    snackbarContext.setSnackbar(`Marked ${task.title} incomplete`, 'Undo', () => {moveTask(task)} )
                }
            }, 2000))
            setTimeouts(currentTimeouts)
        } else {
            for (let timeout in timeouts){
                console.log(timeouts[timeout])
                clearTimeout(timeouts[timeout])
            }
            setTimeouts([])
        }
        
        setIsChecked(!isChecked)
    }

    return (
        <Wrapper
            isWide={isWide}
        >
            <Section>
                    <p>

                        {task.title}
                    </p>
                {
                task.date && (
                    <p>
                        {getDateString(task.date)}
                    </p>
                )
                }

                <Line
                    isChecked={isChecked}
                />
            </Section>

            <Checkbox
                isChecked={isChecked}
                isWide={isWide}
                isTall={isTall}
                onClick={handleChecked}
            />
        </Wrapper>
    )
}

export default Item
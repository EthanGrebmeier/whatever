import { useEffect, useRef, useState } from 'react'
import { UilRotate360, UilTimes } from '@iconscout/react-unicons'
import styled from 'styled-components'
import Button from '../../components/Buttons/Button'
import Input from '../../components/Form/Input'
import { useSnackbarContext } from '../../contexts/SnackbarContext'
import Item from './Item'
import IconButton from '../../components/Buttons/IconButton'


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
    }

`



const HeaderSection = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid black;
`

export const Section = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: ${props => props.width || '60%'};
    position: relative;
`

const NewTask = styled.button`
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
`

const NewTaskFormWrapper = styled.form`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 0 5px 0;
`




const Checklist = (props) => {

    const NewTaskForm = () => {

        const titleInput = useRef(null)

        useEffect(() => {
            titleInput?.current && titleInput.current.focus()
        }, [])

        return (
            <NewTaskFormWrapper
                onKeyDown={e => {
                    console.log(e.key=='enter')
                    if (e.key == 'Enter'){
                        submitForm()
                    }
                } }
                onSubmit={e => {
                    e.preventDefault()
                    submitForm()
                }}
            >
                <Section>
                    <Input
                        value={inputTaskTitle}
                        onChange={(e) => setInputTaskTitle(e.target.value) }
                        width='40%'
                        label='Task Title'
                        ref={titleInput}
                        autoFocus
                    />
                    <Input
                        type='date'
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value) }
                        width='37%'
                        label='Task Date'
                    />
                </Section>
                <Section width={props.applet.width === '100%' ? '12%' : '20%'}>
                    <Button 
                        type='submit'
                    >
                        Submit
                    </Button>
                    <IconButton 
                        onClick={() => closeForm()}
                        tooltip='Close'
                    >
                        <UilTimes/>
                    </IconButton>
                </Section>
            </NewTaskFormWrapper>
        )
    }


    console.log(props)

    const [tasks, setTasks] = useState()
    const [showIncomplete, setShowIncomplete] = useState(true)
    const [showNewTaskForm, setShowNewTaskForm] = useState(false)
    const [inputTaskTitle, setInputTaskTitle] = useState('')
    const [inputDate, setInputDate] = useState('')

    const snackbarContext = useSnackbarContext()
    

    useEffect(() => {
        setTasks(getData())
    }, [] )


    const getData = () => {
        //TODO: Axios logic
        return {
            incompleteTasks: [
                {
                    id: 132345, 
                    title: 'Eng Reading',
                    date: new Date('May 22, 2021 03:24:00')
                },
                {
                    id: 132346, 
                    title: 'Stats Homework',
                    date: new Date('May 20, 2021 03:24:00')
                },
                {
                    id: 132343, 
                    title: 'Pay Bills',
                    date: new Date('May 14, 2021 03:24:00')
                },
                {
                    id: 134345, 
                    title: 'Eng Reading',
                    date: new Date('May 22, 2021 03:24:00')
                },
                {
                    id: 132146, 
                    title: 'Stats Homework',
                    date: new Date('May 20, 2021 03:24:00')
                },
                {
                    id: 132543, 
                    title: 'Pay Bills',
                    date: new Date('May 14, 2021 03:24:00')
                },
                {
                    id: 232146, 
                    title: 'Stats Homework',
                    date: new Date('May 20, 2021 03:24:00')
                },
                {
                    id: 132593, 
                    title: 'Pay Bills',
                    date: new Date('May 14, 2021 03:24:00')
                },
                {
                    id: 132393, 
                    title: 'Pay Bills',
                    date: new Date('May 14, 2021 03:24:00')
                },
                {
                    id: 164345, 
                    title: 'Eng Reading',
                    date: new Date('May 22, 2021 03:24:00')
                },
                {
                    id: 130146, 
                    title: 'Stats Homework',
                    date: new Date('May 20, 2021 03:24:00')
                },
                {
                    id: 132513, 
                    title: 'Pay Bills',
                    date: new Date('May 14, 2021 03:24:00')
                },
                {
                    id: 532146, 
                    title: 'Stats Homework',
                    date: new Date('May 20, 2021 03:24:00')
                },
                {
                    id: 138593, 
                    title: 'Pay Bills',
                    date: new Date('May 14, 2021 03:24:00')
                },
            ],
            completeTasks: [
                {
                    id: 123532, 
                    title: 'UI Mockups'
                },
                {
                    id: 123435,
                    title: 'Data Structure Planning',
                    date: new Date('May 22, 2021 03:24:00')
                }
            ]
        }
    }

    const completeTask = (completedTask) => {
        let currentTasks = {...tasks}
        for (let task in currentTasks.incompleteTasks){
            if (currentTasks.incompleteTasks[task].id == completedTask.id){
                currentTasks.incompleteTasks.splice(task, 1)
                currentTasks.completeTasks.splice(0, 0, completedTask)
            }  
        }
        setTasks(currentTasks)
    }

    const createTask = (task, index) => {
        let currentTasks = {...tasks}
        if (typeof index !== 'undefined') {
            currentTasks.incompleteTasks.splice(index, 0, task)
        } else {
            currentTasks.incompleteTasks.push(task)
        }
        
        setTasks(currentTasks)
    }

    const moveTask = (movedTask) => {
        let currentTasks = {...tasks}
        for (let task in currentTasks.completeTasks){
            if (currentTasks.completeTasks[task].id == movedTask.id){
                currentTasks.completeTasks.splice(task, 1)
                currentTasks.incompleteTasks.splice(0, 0, movedTask)
            }  
        }
        setTasks(currentTasks)
    }

    const submitForm = () =>{
        if (!inputTaskTitle){
            return snackbarContext.setSnackbar('Task Name Required')
        }
        createTask({
            title: inputTaskTitle,
            date: inputDate ? new Date(inputDate) : '',
            id: Math.floor(Math.random() * 899999 + 100000)
        }, 0)
        closeForm()
    }

    const closeForm = () => {
        setInputDate('')
        setInputTaskTitle('')
        setShowNewTaskForm(false)
    }

    const renderTasks = () => {
        if (showIncomplete) {
            return tasks && tasks.incompleteTasks.map( (task, index) => (
                <Item
                    key={task.id}
                    task={task}
                    index={index}
                    onClick={completeTask}
                    createTask={createTask}
                    isWide={props.applet.width === '100%'}
                    isTall={props.applet.height === '100%'}
                />
            ))
        }
        return tasks && tasks.completeTasks.map( (task, index) => (
            <Item
                key={task.id}
                task={task}
                index={index}
                onClick={moveTask}
                createTask={createTask}
                isWide={props.applet.width === '100%'}
                isTall={props.applet.height === '100%'}
                complete={true}
                moveTask={moveTask}
            />
        ))
    }

    return (
        <Wrapper
            isWide={props.applet.width === '100%'}
            isTall={props.applet.height === '100%'}
        >
            <HeaderSection>
                <Section>
                    <Section width={props.applet.width === '100%' ? '40%' : '60%'}>
                        <h2> {showIncomplete ? 'Incomplete Tasks' : 'Complete Tasks'} </h2>
                        <IconButton 
                            onClick={() => setShowIncomplete(!showIncomplete)}
                            tooltip={showIncomplete ? 'View Completed Tasks' : 'View Incomplete Tasks'}
                        >
                            <UilRotate360/>
                        </IconButton>
                    </Section>
                    <h3> Date </h3> 
                </Section>
                <h3> Complete </h3>
            </HeaderSection>
            
            {
            showNewTaskForm ? (
                <NewTaskForm/>
            ) : (
                <NewTask 
                    isWide={props.applet.width === '100%'} 
                    onClick={() => {
                        setShowNewTaskForm(true)
                    }}
                > 
                    + Create Task 
                </NewTask> 
            )
            }

            <ul>
                {renderTasks()}
            </ul>

        </Wrapper>
    )
}

export default Checklist
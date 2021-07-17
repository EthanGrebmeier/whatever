import styled from 'styled-components'
import { UilTimes } from '@iconscout/react-unicons'
import Button from '../../components/Buttons/Button'
import IconButton from '../../components/Buttons/IconButton'
import Input from '../../components/Form/Input'
import { Section } from './Checklist'

const ChecklistFormWrapper = styled.form`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 0 5px 0;

    & input::placeholder{
        color: black;
        opacity: 50%;
    }
`

const ChecklistForm = ({inputTitle, setInputTitle, setInputDate,inputDate, submitForm, toggleForm, isWide}) => {

    return (
        <ChecklistFormWrapper
            onKeyDown={e => {
                if (e.key == 'Escape'){
                    toggleForm()
                }
            } }
            onSubmit={e => {
                e.preventDefault()
                if (inputTitle) {
                    submitForm()
                    toggleForm()
                }
            }}
        >
            <Section>
                <Input
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value) }
                    width='40%'
                    label='Item Title'
                    height='100%'
                    autoFocus
                    placeholder='Name'
                />
                {
                inputDate && (
                <Input
                    type='date'
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value) }
                    width='37%'
                    height='100%'
                    label='Item Date'
                    placeholder='Date'
                />                    
                )
                }

            </Section>
            <Section 
                width={isWide === '100%' ? '12%' : '35%'}
                maxWidth='150px'
            >
                <Button 
                    type='submit'
                >
                    Submit
                </Button>
                <IconButton 
                    onClick={() => toggleForm()}
                    tooltip='Close'
                >
                    <UilTimes/>
                </IconButton>
            </Section>
        </ChecklistFormWrapper>
    )
}

export default ChecklistForm
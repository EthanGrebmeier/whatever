import styled from 'styled-components'
import { UilTimes } from '@iconscout/react-unicons'
import Button from '../../components/Buttons/Button'
import IconButton from '../../components/Buttons/IconButton'
import Input from '../../components/Form/Input'
import { Section } from './Checklist'

const NewItemFormWrapper = styled.form`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 0 5px 0;

    & input::placeholder{
        color: #f8f8f8;
    }
`

const NewItemForm = ({inputItemTitle, setInputItemTitle, setInputItemDate,inputItemDate, submitForm, toggleForm, isWide}) => {

    return (
        <NewItemFormWrapper
            onKeyDown={e => {
                if (e.key == 'Escape'){
                    toggleForm()
                }
            } }
            onSubmit={e => {
                e.preventDefault()
                if (inputItemTitle) {
                    submitForm()
                    toggleForm()
                }
            }}
        >
            <Section>
                <Input
                    value={inputItemTitle}
                    onChange={(e) => setInputItemTitle(e.target.value) }
                    width='40%'
                    label='Item Title'
                    height='100%'
                    autoFocus
                    placeholder='Name'
                />
                <Input
                    type='date'
                    value={inputItemDate}
                    onChange={(e) => setInputItemDate(e.target.value) }
                    width='37%'
                    height='100%'
                    label='Item Date'
                    placeholder='Date'
                />
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
        </NewItemFormWrapper>
    )
}

export default NewItemForm
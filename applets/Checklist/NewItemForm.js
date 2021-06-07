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
`

const NewItemForm = ({inputItemTitle, setInputItemTitle, setInputItemDate,inputItemDate, submitForm, toggleForm, isWide}) => {

    return (
        <NewItemFormWrapper
            onKeyDown={e => {
                if (e.key == 'Enter'){
                    inputItemTitle && submitForm()
                    toggleForm()
                    
                }

                if (e.key == 'Escape'){
                    toggleForm()
                }
                e.stopPropagation()
            } }
            onSubmit={e => {
                e.preventDefault()
                inputItemTitle && submitForm()
                toggleForm()
            }}
        >
            <Section>
                <Input
                    value={inputItemTitle}
                    onChange={(e) => setInputItemTitle(e.target.value) }
                    width='40%'
                    label='Item Title'
                    autoFocus
                />
                <Input
                    type='date'
                    value={inputItemDate}
                    onChange={(e) => setInputItemDate(e.target.value) }
                    width='37%'
                    label='Item Date'
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
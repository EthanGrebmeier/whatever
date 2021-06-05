import styled from 'styled-components'
import Button from '../../../Buttons/Button'
import Emphasis from '../../../Text/Emphasis'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    p{
        text-align: center;
    }
`

const Buttons = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center
`

const ConfirmSpot = (props) => {
    return (
        <Wrapper>
            <p> Replace <Emphasis> {props.oldApplet?.name} </Emphasis> with <Emphasis> {props.newApplet?.name} </Emphasis>? </p>
            <Buttons>
                <Button 
                    width='100px'
                    secondary
                    onClick={() => {
                        props.setIsConfirmingSpot(false)
                    }}
                >
                    Cancel
                </Button>
                <Button width='100px' onClick={() => props.addApplet(props.newApplet, props.position, props.replaceAt)}>
                    Confirm
                </Button>
            </Buttons>
        </Wrapper>
    )
}

export default ConfirmSpot
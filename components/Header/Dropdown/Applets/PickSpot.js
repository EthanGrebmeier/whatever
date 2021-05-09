import { useState } from 'react'
import styled from 'styled-components'
import Back from '../../../Buttons/Back'
import Button from '../../../Buttons/Button'
import Emphasis from '../../../Text/Emphasis'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const Spaces = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Space = styled.div`
    width: 48%;
    height: 48%;
    border-radius: 10px;
    border: 2px solid black;
    background: ${props => props.isSelected ? (props.isOccupied != undefined ? '#EA844A' : '#43D051') : 'white'};
    cursor: pointer;
    &:hover{
        border: 3px solid black;
    }
`

const PickSpot = (props) => {
    const [selected, setSelected] = useState(0)
    return (
        <Wrapper>
            <Back
                onClick={() => props.setIsPickingSpot(false)}
                position='absolute'
                top='5px'
                left='5px'
            />
            <p> Where will <Emphasis> {props.newApplet?.name} </Emphasis> go?</p>
            <Spaces>
                {[0,1,2,3].map( (space, index) => {
                    return (<Space
                        key={index}
                        isSelected={selected === index}
                        isOccupied={props.getAppletIndex(props.getAppletPosition(space))}
                        onClick={() => setSelected(index)}
                    />)
                 })}
            </Spaces>
            <Button onClick={() => props.addApplet(props.newApplet, selected)}>
                Add Module
            </Button>
        </Wrapper>
    )
}

export default PickSpot
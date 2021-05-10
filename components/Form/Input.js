import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.input`
    width: 88%;
    border: none;
    border-bottom: 2px solid black;
    font-size: 16px;
    font-family: 'Quicksand';
    font-weight: 500;
    position: relative;
`

const Input = (props) => {
    return(
        <Wrapper onChange={props.onChange} value={props.value} type={props.hidePassword ? 'password' : 'text'}>
            
        </Wrapper>
    )
}

export default Input
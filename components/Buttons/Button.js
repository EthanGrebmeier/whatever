import styled from 'styled-components'

const Button = styled.button`
    width: ${props => props.width};
    height: ${props => props.height};
    padding: 5px;
    background: none;
    border: 2px solid black;
    border-radius: 10px;
    font-family: 'Quicksand';
    font-weight: 600;
    font-size: 18px;
    cursor: pointer;
`

export default Button
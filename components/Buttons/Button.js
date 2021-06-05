import styled from 'styled-components'


const Button = styled.button`
    width: ${props => props.width};
    height: ${props => props.height};
    padding: 5px 10px 5px 10px;
    background: ${props => !props.secondary ? 'rgba(255, 191, 0, 1)' : 'rgba(239, 206, 250, 1)'};
    border: 3px solid black;
    border-radius: 16px;
    font-family: 'Quicksand';
    font-weight: 900;
    font-size: 18px;
    cursor: pointer;
    
    && {
        transition: none;
    }
    :hover{
        background: ${props => !props.secondary ? 'rgba(255, 191, 0, .6)' : 'rgba(239, 206, 250, .6)'};
    }
`

export default Button
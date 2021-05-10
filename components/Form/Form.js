import styled from 'styled-components'

const Form = styled.form`
    width: ${props => props.width};
    height: ${props => props.height};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

export default Form
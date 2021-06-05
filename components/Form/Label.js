import styled from 'styled-components'

const Label = styled.label`
    display: flex; 
    flex-direction: ${props => props.flexDirection || 'column'};
    justify-content: space-between;
    align-items: ${props => props.flexDirection == 'row' ? 'center' : ''};
    height: 50px;
    width: ${props => props.width || '100%'};
    position: relative;
    font-weight: 500;
`

export default Label
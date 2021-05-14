import styled from 'styled-components'

const Wrapper = styled.input`
    width: ${props => props.width || '88%'};
    border: none;
    border-bottom: 2px solid black;
    font-size: 16px;
    font-family: 'Quicksand';
    font-weight: 500;
    position: relative;
`

const Input = ({onChange, onSubmit, value, hidePassword, width}) => {
    return(
        <Wrapper 
            onKeyPress={(e) => e.key == 'Enter' && onSubmit && onSubmit()}   
            onChange={onChange} value={value} 
            type={hidePassword ? 'password' : 'text'}
            width={width}
        />
    )
}

export default Input
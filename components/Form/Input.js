import styled from 'styled-components'

const Wrapper = styled.input`
    width: ${props => props.width || '88%'};
    border: none;
    border-bottom: 2px solid black;
    font-size: 16px;
    font-family: 'Quicksand';
    font-weight: 500;
    position: relative;
    background: none;
`

const Input = ({onChange, onSubmit, value, hidePassword, width, type, label, ref, autoFocus}) => {

    if (!type){
        if (hidePassword){
            type = 'password'
        } else {
            type='text'
        }
    }

    return(
        <Wrapper 
            onKeyPress={(e) => e.key == 'Enter' && onSubmit && onSubmit()}   
            onChange={onChange} 
            value={value} 
            type={type}
            width={width}
            data-lpignore="true"
            aria-label={label}
            ref={ref}
            autoFocus={autoFocus}
        />
    )
}

export default Input
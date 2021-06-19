import styled from 'styled-components'

const Wrapper = styled.input`
    width: ${props => props.width || '88%'};
    height: ${props => props.height};
    border: none;
    border-radius: 0;
    border-bottom: 2px solid black;
    font-size: 16px;
    font-family: 'Quicksand';
    font-weight: 500;
    position: relative;
    background: none;

`

const Input = ({onChange, onSubmit, onKeyDown, value, hidePassword, width, height, type, label, placeholder, ref, autoFocus}) => {

    if (!type){
        if (hidePassword){
            type = 'password'
        } else {
            type='text'
        }
    }

    return(
        <Wrapper 
            onKeyPress={(e) => e.key == 'Enter' && onSubmit && onSubmit(e)}   
            onChange={onChange} 
            value={value} 
            type={type}
            width={width}
            height={height}
            data-lpignore="true"
            aria-label={label}
            ref={ref}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onKeyDown={onKeyDown}
        />
    )
}

export default Input
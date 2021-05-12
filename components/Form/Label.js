import { useState, cloneElement } from 'react'
import styled from 'styled-components'
import { UilEyeSlash, UilEye } from '@iconscout/react-unicons'

const Wrapper = styled.label`
    display: flex; 
    flex-direction: ${props => props.flexDirection || 'column'};
    justify-content: space-between;
    align-items: ${props => props.flexDirection == 'row' ? 'center' : ''};
    height: 50px;
    width: ${props => props.width || '100%'};
    position: relative;
`

const Eyeball = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
`

const Label = ({children, flexDirection, width, showEye}) => {

    const [showPassword, setShowPassword] = useState(false)


    return (
        <Wrapper flexDirection={flexDirection} width={width}>
            {children && children.map(child => {
                if(child.type == 'p'){
                    return cloneElement(child)
                }
                return cloneElement(child, {hidePassword: showEye && !showPassword})
            })}
            {
            showEye && (
                <Eyeball type='button' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                    <UilEye/>
                ) : (
                    <UilEyeSlash/>
                )}
                </Eyeball>
            )
            }

        </Wrapper>
    )
}

export default Label
import { useState, cloneElement } from 'react'
import styled from 'styled-components'
import { UilEyeSlash, UilEye } from '@iconscout/react-unicons'

const Wrapper = styled.label`
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    height: 50px;
    width: 100%;
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

const Label = ({children, showEye}) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <Wrapper>
            {children && children.map(child => {
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
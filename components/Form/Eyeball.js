import styled from 'styled-components'
import { UilEyeSlash, UilEye } from '@iconscout/react-unicons'
import IconButton from '../Buttons/IconButton'
const EyeballWrapper = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
`

const Eyeball = ({showPassword, setShowPassword}) => {
    return (
        <EyeballWrapper type='button' onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword)}}>
            <IconButton tooltip={showPassword ? 'Hide Password' : 'Show Password'}>
            {showPassword ? (
                <UilEye/>
            ) : (
                <UilEyeSlash/>
            )}
            </IconButton>
        </EyeballWrapper>
    )
}

export default Eyeball
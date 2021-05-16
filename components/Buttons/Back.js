import styled from 'styled-components'
import { UilArrowLeft } from '@iconscout/react-unicons'

const Wrapper = styled.button`
   width: ${props => props.width};
   height: 30px;
   position: ${props => props.position}; 
   left: ${props => props.left}; 
   right: ${props => props.right}; 
   top: ${props => props.top}; 
   bottom: ${props => props.bottom}; 
   margin: 0;
   padding: 0;
   background: none;
   border: none;
   cursor: pointer;
`

const Back = ({onClick, width, position, left, right, top, bottom}) => {
    return (
        <Wrapper
            onClick={onClick} 
            width={width} 
            position={position}
            left={left}
            right={right}
            top={top}
            bottom={bottom}
        >
            <UilArrowLeft/>
        </Wrapper>
    )
} 

export default Back
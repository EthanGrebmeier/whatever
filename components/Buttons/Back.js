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
   display: flex;
   justify-content: space-between;
   align-items: center;
   
   && {
       h2 {
           font-size: initial;
       }
   }
`

const Back = ({onClick, width, position, left, right, top, bottom, withText}) => {
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
            {withText && (<h2> Back </h2>)}
        </Wrapper>
    )
} 

export default Back
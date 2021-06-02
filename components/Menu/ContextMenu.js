import styled from 'styled-components'

const Wrapper = styled.div`
    display: ${props => props.isShowing ? 'flex' : 'none'};
    position: absolute;
    top: ${props => props.yPos};
    left: ${props => props.xPos};
    width: 200px;
    z-index: 200;
    flex-direction: column;
    background: black;
    border-radius: 10px;
`

const Option = styled.button`
    background: none;
    border: none;
    font-family: 'Quicksand';
    padding: 10px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    :hover{
        font-weight: 500;
    }
`

const ContextMenu = ({isShowing, options, xPos, yPos}) => {
    console.log('Im here')
    return (
        <Wrapper 
            isShowing={isShowing}
            xPos={xPos} 
            yPos={yPos}
        >
            {options.map((option) => (
                <Option onClick={option.onClick}>
                    {option.prompt}
                </Option>
            ))}
        </Wrapper>
    )
}

export default ContextMenu
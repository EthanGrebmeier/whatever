import styled from 'styled-components'
import { useContextMenuContext } from '../../contexts/ContextMenuContext'

const Wrapper = styled.div`
    display: ${props => props.isShowing ? 'flex' : 'none'};
    position: absolute;
    top: ${props => props.yPos};
    left: ${props => props.xPos};
    width: 300px;
    z-index: 200;
    flex-direction: column;
    align-items: start;
    background: black;
    border-radius: 10px;
    padding: 10px 0 10px 0;
`

const Option = styled.button`
    background: none;
    border: none;
    font-family: 'Quicksand';
    padding: 10px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
    text-align: start;
    :hover{
        background: grey;
    }
`

const ContextMenu = ({isShowing, options, xPos, yPos}) => {
    console.log('Im here')

    const contextMenuContext = useContextMenuContext()

    const onClick = (e, optionClick) => {
        optionClick(e)
        contextMenuContext.setContextMenu({
            ...contextMenuContext.contextMenu,
            isShowing: false
        })
    }   

    return (
        <Wrapper 
            isShowing={isShowing}
            xPos={xPos} 
            yPos={yPos}
        >
            {options.map((option) => (
                <Option 
                    onClick={(e) => onClick(e, option.onClick)}
                    key={option.prompt}
                >
                    {option.prompt}
                </Option>
            ))}
        </Wrapper>
    )
}

export default ContextMenu
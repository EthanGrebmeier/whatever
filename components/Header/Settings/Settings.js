import styled from 'styled-components'
import HeaderDropdown from '../Dropdown/HeaderDropdown'


const Wrapper = styled.div`
    width: 300px;
    height: 300px;
    background: white;
    border: 2px solid black;
    border-radius: 0 0 10px 10px;
    padding: 10px;
`

const Section = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Colors = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Color = styled.button`
    width: 20px;
    height: 20px;
    background: ${props => props.background};
    border-radius: 50px;
    outline: none;
    border: ${props => props.isChosen ? '3px solid black' : '2px solid black'};
    cursor: pointer;
`

const Background = (props) => {
    const colors = [
        '#F49FBC',
        '#735CDD',
        '#FF9F1C',
        '#60993E'
    ]
    return (
        <Section>
            <p>
                Background Color
            </p>
            <Colors>
            {colors.map(color => 
                <Color
                    background={color}
                    isChosen={props.background == color}
                    onClick={() => props.setBackground(color)}
                />
            )}
            </Colors>
        </Section>
    )
}

const Settings = (props) => {
    return (
        <Wrapper>
            <Background
                background={props.background}
                setBackground={props.setBackground}
            />
        </Wrapper>
    )
}

export default Settings
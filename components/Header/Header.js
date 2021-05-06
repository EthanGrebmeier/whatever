import styled from 'styled-components'
import Applets from './Dropdown/Applets/Applets'
import HeaderDropdown from './Dropdown/HeaderDropdown'
import Layout from './Dropdown/Layout'
import { UilCog } from '@iconscout/react-unicons'
import Settings from './Settings/Settings'
const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: 10px;
    border: 2px solid black;
    background: white;
    position: relative;
    h1{
        margin-right: 40px;
        padding: 10px; 
    }
`

const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

const Header = ({layout, setLayout, background, setBackground}) => {
    return (
        <Wrapper>
            <HeaderSection>
                <h1> Whatever </h1>
                <HeaderDropdown title='Layout' showCarrot={true}>
                    <Layout/>
                </HeaderDropdown>
                <HeaderDropdown title='Modules' showCarrot={true}>
                    <Applets 
                        layout={layout}
                        setLayout={setLayout}
                    />
                </HeaderDropdown>
            </HeaderSection>

            <HeaderSection>
                <HeaderDropdown title={UilCog} right={'-30px'}>
                    <Settings
                        background={background}
                        setBackground={setBackground}
                    />
                </HeaderDropdown>
            </HeaderSection>

        </Wrapper>
    )
}
 
export default Header
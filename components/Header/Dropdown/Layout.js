import styled from 'styled-components'
import HeaderDropdown from './HeaderDropdown'

const Wrapper = styled.div`

    height: ${props => props.height};
    width: 300px;
    background: white;
    border: 2px solid black;
    border-radius: 0 0 10px 10px;

`

const Layout = () => {
    return (
        <Wrapper height='200px'>

        </Wrapper>
    )
}

export default Layout
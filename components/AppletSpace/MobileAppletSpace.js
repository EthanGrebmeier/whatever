import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 85vh; 
    position: relative;
`     

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 10px;
    border: 2px solid black;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const MobileAppletSpace = () => {
    return (
        <Wrapper>
            <Container>
                <h1>
                    Whatever does not yet support mobile devices. Please check back soon, or visit us on desktop!
                </h1>
            </Container>
        </Wrapper>
    )
}

export default MobileAppletSpace
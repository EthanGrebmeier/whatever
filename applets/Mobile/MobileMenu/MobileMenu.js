import styled from 'styled-components'
import applets from '../../applets'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 100;
    top: 0;
    background: #CED0FA;
`

const MobileMenu = ({setMobileAppletId, setMobileMenuOpen}) => {
    return (
        <Wrapper>
            {
                applets.filter((applet) => !applet.mobileOnly).map((applet) => (
                    <h1
                        onClick={() => {
                            setMobileAppletId(applet.id)
                            setMobileMenuOpen(false)
                        }}
                    > 
                        {applet.name} 
                    </h1>
                ))
            }
        </Wrapper>    
    )
}

export default MobileMenu
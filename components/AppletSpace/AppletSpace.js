import DesktopAppletSpace from "./DesktopAppletSpace"
import MobileAppletSpace from "./MobileAppletSpace"
import Loading from '../Loading/Loading'
import styled from 'styled-components'


const AppletSpaceWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const AppletSpace = (props) => {
    console.log(props)
    return (
        <AppletSpaceWrapper>
            {props.loading || true && (
            <Loading
                background={props.background}
            />
            )}
            {props.isMobile ? 
                (
                <MobileAppletSpace
                    {...props}
                />) : 
                (
                <DesktopAppletSpace
                    {...props}
                />
                )
            }
        </AppletSpaceWrapper>
    )
}

export default AppletSpace

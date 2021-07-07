import DesktopAppletSpace from "./DesktopAppletSpace"
import MobileAppletSpace from "./MobileAppletSpace"
import Loading from '../Loading/Loading'


const AppletSpace = (props) => {

    if (props.loading){
        return <Loading/>
    }

    if (props.isMobile){
        return (
        <MobileAppletSpace
            {...props}
        />)
    }
    
    return ( 
        <DesktopAppletSpace
            {...props}
        />
    )
}

export default AppletSpace

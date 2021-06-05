import DesktopAppletSpace from "./DesktopAppletSpace"
import MobileAppletSpace from "./MobileAppletSpace"


const AppletSpace = (props) => {
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

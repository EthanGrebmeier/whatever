import { useEffect } from 'react'
import styled from 'styled-components'
import { getMobileComponent } from '../../applets/applets'
import MobileMenu from '../../applets/Mobile/MobileMenu/MobileMenu'

const Wrapper = styled.div`
    width: 100%;
    height: 85vh; 
    position: relative;
    padding-bottom: 10px;
`     

const MobileAppletSpace = ({mobileMenuOpen, setMobileMenuOpen, mobileAppletId, setMobileAppletId, layout, ...rest}) => {
    
    useEffect(() => {
        if (layout?.applets && layout.applets.length > 0){
            setMobileAppletId(layout.applets[0].id.slice(0, -3))
        }
    }, [])
    
    return (
        <Wrapper>
            {getMobileComponent(mobileAppletId, {
                mobileAppletId, 
                setMobileAppletId, 
                applet: {
                    width: '100%',
                    height: '100%',
                },
                ...rest
            })}
            {
                mobileMenuOpen && (
                    <MobileMenu
                        setMobileAppletId={setMobileAppletId}
                        mobileAppletId={mobileAppletId}
                        setMobileMenuOpen={setMobileMenuOpen}
                    />
                )
            }
        </Wrapper>
    )
}

export default MobileAppletSpace
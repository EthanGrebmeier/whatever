import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    text-align: start;
`

const MobileWelcome = () => {
    return (
        <Wrapper>
            <h1>
                Hey there,
            </h1>
            <p>
                Welcome to Whatever, my Desktop assistant!<br/><br/>

                On desktop, Whatever allows you to add and rearrange up to four applets to personalize your very own workspace. <br/><br/>

                On your mobile device, you can open up one applet at a time!<br/><br/>

                Try signing in and saving your data to sync between platforms.<br/><br/>
            </p>
            <h2>
                Ethan G <br/>
                EthanGrebmeier@Gmail.com
            </h2>
        </Wrapper>
    )
}

export default MobileWelcome

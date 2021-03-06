import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    background: ${props => props.background};
    border-radius: 0 0 10px 10px;
    transition: all .3s ease;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    *:disabled{
        color: black;
        cursor: text;
    }

    @media screen and (max-width: 740px){
        padding: 0;
    }

`

const Section = styled.div`
    width: 100%;
    border-bottom: 2px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Notes = styled.p`
    width: 100%;
    flex: 1 1 0px;
    font-family: 'Quicksand';
    font-size: ${props => props.isWide ? '18px' : '16px'};
    font-weight: 500;
    overflow: scroll;
`

const Title = styled.h2`
    font-size: ${props => props.isWide ? '32px' : '28px'};
    width: 100%;
    font-weight: 600;
    padding: 10px 0 10px 0;
`

const PatchNotes = ({applet}) => {


    return (
        <Wrapper  
            background={applet.background}
        >
            <Section>
                <Title
                    isWide={applet.width == '100%'}
                >
                    Release 0.1 Patch Notes
                </Title>
            </Section>
            <Notes
                isWide={applet.width == '100%'}
            >
                This is the first release of Whatever, my desktop assistant!<br/>(Name may or may not change in the future) <br/><br/>Whatever allows you to place applets in a 2x2 grid, enabling you to create a workspace that works for you! Try adding an applet, or messing around with the ones on your screen to get started.<br/><br/>  
    
                <br/>Checklist (NEW) <br/>
                    
                    Features: <br/>
                    - Create checklist items<br/>
                    - Complete checklist items<br/>
                    - Sort by title, date, or completion<br/>
                    - Delete checklist items (Try right-clicking)<br/>
                    - All changes automatically saved <br/><br/>
                
                <br/>Notepad (New)<br/>
                
                    Features:<br/>
                    - Set a title for your notes<br/>
                    - Take notes<br/>
                    - Save your notes (Limit once per minute)<br/>
            </Notes>
        </Wrapper>
    )
}

export default PatchNotes
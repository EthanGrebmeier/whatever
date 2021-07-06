import styled from 'styled-components'
import useSound from 'use-sound'
import PianoImage from './piano.svg'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.background};
    display: flex;
    justify-content: center;
    align-items: center;
    
    svg{
        width: 80%;
    }

    @media screen and (max-width: 740px){
        svg{
            width: 94%;
        }
    }

    .piano_svg__note-c,.piano_svg__note-d,.piano_svg__note-e,.piano_svg__note-f,.piano_svg__note-g,.piano_svg__note-a,.piano_svg__note-b,.piano_svg__note-a-flat,.piano_svg__note-b-flat,.piano_svg__note-d-flat,.piano_svg__note-e-flat,.piano_svg__note-g-flat {
        cursor: pointer;
    }

`


const Piano = ({applet}) => {

    const getNote = (event) => {
        let className = event.target.className.baseVal
        if (!className) {return}
        let trimmedClass = className.slice(16)
        if (!trimmedClass) { return }
        switch (trimmedClass) {
            case 'c':
                playC()        
                break
            case 'd':
                playD()         
                break       
            case 'e':
                playE()         
                break       
            case 'f':
                playF()        
                break        
            case 'g':
                playG()          
                break      
            case 'a':
                playA()         
                break       
            case 'b':
                playB()         
                break       
            case 'd-flat':
                playDFlat()         
                break       
            case 'a-flat':
                playAFlat()         
                break       
            case 'b-flat':
                playBFlat()         
                break       
            case 'e-flat':
                playEFlat()         
                break       
            case 'g-flat':
                playGFlat()         
                break       
            default:
                break;
        }
    } 
 

    const [playC] = useSound(
        './mp3/piano-mp3_C3.mp3',
        {volume: 1}
    )

    const [playD] = useSound(
        '/mp3/piano-mp3_D3.mp3',
        {volume: 0.5}
    )

    const [playE] = useSound(
        '/mp3/piano-mp3_E3.mp3',
        {volume: 0.5}
    )

    const [playF] = useSound(
        '/mp3/piano-mp3_F3.mp3',
        {volume: 0.5}
    )

    const [playG] = useSound(
        '/mp3/piano-mp3_G3.mp3',
        {volume: 0.5}
    )

    const [playA] = useSound(
        '/mp3/piano-mp3_A3.mp3',
        {volume: 0.5}
    )

    const [playB] = useSound(
        '/mp3/piano-mp3_B3.mp3',
        {volume: 0.5}
    )

    const [playAFlat] = useSound(
        '/mp3/piano-mp3_Ab3.mp3',
        {volume: 0.5}
    )

    const [playBFlat] = useSound(
        '/mp3/piano-mp3_Bb3.mp3',
        {volume: 0.5}
    )

    const [playDFlat] = useSound(
        '/mp3/piano-mp3_Db3.mp3',
        {volume: 0.5}
    )

    const [playEFlat] = useSound(
        '/mp3/piano-mp3_Eb3.mp3',
        {volume: 0.5}
    )

    const [playGFlat] = useSound(
        '/mp3/piano-mp3_Gb3.mp3',
        {volume: 0.5}
    )

    return (
        <Wrapper
            background={applet.background}
        >
            <PianoImage
                onClick={getNote}
            />
        </Wrapper>
    )
}

export default Piano
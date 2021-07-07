import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import useSound from 'use-sound'
import PianoImage from './piano.svg'
import NoteImage from './note.svg'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.background};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    
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

const Rise = keyframes`
    from {bottom: 40%; opacity: 100%;}
    to {bottom: 80%; opacity: 0%;}
`

const Note = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: ${props => props.left}%;
    animation-name: ${Rise};
    animation-duration: 3s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
`


const Piano = ({applet}) => {

    const [mouseDown, setMouseDown] = useState(false)

    const [shownNotes, setShownNotes] = useState([])

    const addNoteNode = (left) => {
        let id = Math.floor(Math.random() * 90000) 

        const now = Date.now()

        let oldNotes = shownNotes.filter(note => {
            const delta = now - note.createdAt
            return delta < 3500
        })

        oldNotes.push({
            left,
            id,
            createdAt: Date.now()
        })

        setShownNotes(oldNotes)
        console.log(oldNotes)
    }

    const playNoteFromClick = (event) => {
        let className = event.target.className.baseVal
        if (!className) {return}
        let trimmedClass = className.slice(16)
        if (!trimmedClass) { return }
        playNote(trimmedClass)
    }

    const playNoteFromKey = (e) => {
        console.log(e)
        switch(e.key){
            case 's': 
                playNote('c')
                break
            case 'e': 
                playNote('d-flat')
                break
            case 'd': 
                playNote('d')
                break
            case 'r': 
                playNote('e-flat')
                break
            case 'f': 
                playNote('e')
                break
            case 'g': 
                playNote('f')
                break
            case 'y': 
                playNote('g-flat')
                break
            case 'h': 
                playNote('g')
                break
            case 'u': 
                playNote('a-flat')
                break
            case 'j': 
                playNote('a')
                break
            case 'i': 
                playNote('b-flat')
                break
            case 'k': 
                playNote('b')
                break
            default: 
                break
        }
    } 

    const playNote = (noteName) => {
        switch (noteName) {
            case 'c':
                playC()
                addNoteNode('20')        
                break
            case 'd':
                playD()
                addNoteNode('30')             
                break       
            case 'e':
                playE()
                addNoteNode('40')       
                break       
            case 'f':
                playF()        
                addNoteNode('51')       
                break        
            case 'g':
                playG()          
                addNoteNode('61')       
                break      
            case 'a':
                playA()         
                addNoteNode('71')       
                break       
            case 'b':
                playB()         
                addNoteNode('82')       
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
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
            onMouseLeave={() => setMouseDown(false)}
            onKeyDown={playNoteFromKey}
            tabIndex='0'
        >
            {shownNotes.map(note => (
                <Note
                    left={note.left}
                    key={note.id}
                >
                    <NoteImage/>
                </Note>
            ))}
            <PianoImage
                onClick={playNoteFromClick}
                draggable={true}
                onMouseOver={(e) => {
                    if (mouseDown){
                        playNoteFromClick(e)
                    }
                }}
            />
        </Wrapper>
    )
}

export default Piano
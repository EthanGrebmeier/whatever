import Notepad from "./Notepad/Notepad";
import Checklist from './Checklist/Checklist'

const applets = [
    {
        id: 'notepad',
        name: 'Notepad',
        width: '49%',
        height: '49%',
    },
    {
        id: 'checklist',
        name: 'Checklist',
        width: '49%',
        height: '49%',
    },
    {
        id: 'checklist',
        name: '3',
        width: '49%',
        height: '49%',
    },
    {
        id: 'checklist',
        name: '4',
        width: '49%',
        height: '49%',
    },
]

export const getComponent = (id) => {
    switch (id) {
        case 'notepad':
            return <Notepad/>
        case 'checklist':
            return <Checklist/>
        default:
            console.log('Default Component Returned')
            return <Checklist/>
    }
}


export default applets
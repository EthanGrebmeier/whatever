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

export const getComponent = (id, props) => {
    switch (id) {
        case 'notepad':
            return <Notepad {...props}/>
        case 'checklist':
            return <Checklist {...props} />
        default:
            return <Checklist {...props} />
    }
}


export default applets
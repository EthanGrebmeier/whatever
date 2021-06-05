import Notepad from "./Notepad/Notepad";
import ChecklistController from './Checklist/ChecklistController'
import patchNotes from "./PatchNotes/patchNotesContent";
import PatchNotes from "./PatchNotes/patchNotes";

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
        id: 'patchnotes',
        name: 'Patch Notes',
        width: '49%',
        height: '49%'
    },
]

export const getComponent = (id, props) => {
    switch (id) {
        case 'notepad':
            return <Notepad {...props}/>
        case 'checklist':
            return <ChecklistController {...props} />
        case 'patchnotes':
            return <PatchNotes {...props}/>
        default:
            return  <ChecklistController {...props} />
    }
}


export default applets
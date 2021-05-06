import Notepad from "./Notepad/Notepad";
import Checklist from './Checklist/Checklist'

const applets = [
    {
        id: 'notepad',
        name: 'Notepad',
        component: <Notepad/>
    },
    {
        id: 'checklist',
        name: 'Checklist',
        component: <Checklist/>
    },
    {
        id: 'checklist',
        name: '3',
        component: <Notepad/>
    },
    {
        id: 'checklist',
        name: '4',
        component: <Notepad/>
    },

]

export default applets
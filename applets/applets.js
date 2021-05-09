import Notepad from "./Notepad/Notepad";
import Checklist from './Checklist/Checklist'

const applets = [
    {
        id: 'notepad',
        name: 'Notepad',
        width: '49%',
        height: '49%',
        component: <Notepad/>
    },
    {
        id: 'checklist',
        name: 'Checklist',
        width: '49%',
        height: '49%',
        component: <Checklist/>
    },
    {
        id: 'checklist',
        name: '3',
        width: '49%',
        height: '49%',
        component: <Notepad/>
    },
    {
        id: 'checklist',
        name: '4',
        width: '49%',
        height: '49%',
        component: <Notepad/>
    },

]

export default applets
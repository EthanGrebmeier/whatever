import Notepad from "./Notepad/Notepad";
import ChecklistController from './Checklist/ChecklistController'
import PatchNotes from "./PatchNotes/PatchNotes";
import MobileWelcome from "./Mobile/MobileWelcome/MobileWelcome";
import Piano from './Piano/Piano'
import Clock from "./Clock/Clock";

const applets = [
    {
        id: 'notepad',
        name: 'Notepad',
        background: '#92B9BD',
        width: '49%',
        height: '49%',
    },
    {
        id: 'checklist',
        name: 'Checklist',
        background: '#77BA99',
        width: '49%',
        height: '49%',
    },
    {
        id: 'piano',
        name: 'Piano',
        background: '#EC4B4B',
        width: '49%',
        height: '49%',
    },
    {
        id: 'patchnotes',
        name: 'Patch Notes',
        background: '#FFC590',
        width: '49%',
        height: '49%'
    },
    {
        id: 'mobile-welcome',
        name: 'Whatever',
        background: '#EFCEFA',
        mobileOnly: true,
        width: '49%',
        height: '49%',
    },
    {
        id: 'mobile-menu',
        name: 'Select an Applet',
        backround: '#CED0FA',
        mobileOnly: true,
        width: '49%',
        height: '49%',
    },
    {
        id: 'clock',
        name: 'Clock',
        background: '#CED0FA',
        width: '49%',
        height: '49%'
    }
]

export const getComponent = (id, props) => {
    switch (id) {
        case 'notepad':
            return <Notepad {...props}/>
        case 'checklist':
            return <ChecklistController {...props} />
        case 'patchnotes':
            return <PatchNotes {...props}/>
        case 'clock':
            return <Clock {...props}/>
        // case 'piano':
        //     return <Piano {...props}/>
        default:
            return  <ChecklistController {...props} />
    }
}

export const getMobileComponent = (id, props) => {
    switch (id) {
        case 'notepad':
            return <Notepad {...props}/>
        case 'checklist':
            return <ChecklistController {...props} />
        case 'patchnotes':
            return <PatchNotes {...props}/>
        // case 'piano':
        //     return <Piano {...props}/>
        default:
            return  <MobileWelcome />
    }
}

export const getMobileComponentObject = (id) => {
    if (!id){
        return applets[3]
    }
    for (const applet of applets ){
        if (applet.id == id){
            return applet
        }
    }
    return applets[0]
}

export default applets
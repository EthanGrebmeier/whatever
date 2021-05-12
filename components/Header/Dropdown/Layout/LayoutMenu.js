import Button from '../../../Buttons/Button'
import Emphasis from '../../../Text/Emphasis'

const LayoutMenu = ({setFrame, user, layout}) => {
    
    const checkIsSavedLayout = (layoutId) => {
        let layouts = user?.layoutMeta?.layouts
        if (layouts){
            for (let layout in layouts){
                if (layouts[layout]._id == layoutId){
                    return true
                }
            }
        }
        return false
    }


    const isSavedLayout = checkIsSavedLayout(layout._id)


    const saveLayout = () => {

    }

    return (
        <>
            {isSavedLayout && (
            <Button onClick={() => setFrame('save-new')}>
                Save <Emphasis> {layout.name} </Emphasis> 
            </Button>
            )}
            <Button onClick={() => setFrame('save-new')}>
                Save As
            </Button>
            <Button onClick={() => setFrame('load')}>
                Load Layout
            </Button>
        </>

    )
}

export default LayoutMenu
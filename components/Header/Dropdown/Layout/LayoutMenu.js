import axios from 'axios'
import styled from 'styled-components'
import { useSnackbarContext } from '../../../../contexts/SnackbarContext'
import Button from '../../../Buttons/Button'
import Emphasis from '../../../Text/Emphasis'

const Wrapper = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    & button:not(:first-child){
        margin-top: 10px;
    }
`

const LayoutMenu = ({setFrame, user, layout}) => {

    const {snackbar, setSnackbar} = useSnackbarContext()
    
    const checkIsSavedLayout = (layoutID) => {
        let layouts = user?.layoutMeta?.layouts
        if (layouts){
            for (let layout in layouts){
                if (layouts[layout]._id == layoutID){
                    return true
                }
            }
        }
        return false
    }

    const saveLayout = async () => {
        axios.put(process.env.NEXT_PUBLIC_URL + '/user/layout/' + layout._id, {
            layout: layout
        }).then( res => {
            setSnackbar(`Saved ${layout.name}`)
        }).catch(err => console.log(err))
    }

    return (
        <Wrapper>
            {layout && checkIsSavedLayout(layout._id) && (
            <Button width='100%' onClick={saveLayout}>
                Save <Emphasis> {layout.name} </Emphasis> 
            </Button>
            )}
            <Button 
                width='100%'  
                onClick={() => setFrame('save-new')}
                secondary
            >
                Save As
            </Button>
        </Wrapper>

    )
}

export default LayoutMenu
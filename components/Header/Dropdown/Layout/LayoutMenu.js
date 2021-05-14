import axios from 'axios'
import styled from 'styled-components'
import Button from '../../../Buttons/Button'
import Emphasis from '../../../Text/Emphasis'

const LayoutMenu = ({setFrame, user, layout}) => {

    const Wrapper = styled.div`
        height: 50%;
        width: 47%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        & button:not(:first-child){
            margin-top: 10px;
        }
    `
    
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

    const saveLayout = async () => {
        console.log('1')
        console.log(layout)
        axios.put(process.env.NEXT_PUBLIC_URL + '/user/layout/' + layout._id, {
            layout: layout
        }).then( res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    return (
        <Wrapper>
            {isSavedLayout && (
            <Button width='100%' onClick={saveLayout}>
                Save <Emphasis> {layout.name} </Emphasis> 
            </Button>
            )}
            <Button width='100%'  onClick={() => setFrame('save-new')}>
                Save As
            </Button>
        </Wrapper>

    )
}

export default LayoutMenu
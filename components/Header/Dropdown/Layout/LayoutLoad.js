import { useState } from 'react'
import { UilPen,UilStar } from '@iconscout/react-unicons'
import styled from 'styled-components'
import Button from '../../../Buttons/Button'
import Form from '../../../Form/Form'
import Input from '../../../Form/Input'
import Label from '../../../Form/Label'
import Checkbox from '../../../Form/Checkbox'
import axios from 'axios'

const Wrapper = styled.ul`
display: flex;
flex-direction: column;
width: 100%;
list-style-type: none;
padding-inline-start: 0;
li:not(:first-child) {
    border-top: 1px solid black;
}
`

const Layout = styled.li`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 40px;
`

const LayoutButtons = styled.div`
width: 25%;
display: flex;
justify-content: space-between;
svg{
    cursor: pointer;
}
`

const Name = styled.p`
    & :hover{
        cursor: pointer;
        font-weight: 700;
    }
`

const Nothing = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`


const LayoutLoad = (props) => {


    const onSelect = async (layout) => {
        let {data} = await axios.get(process.env.NEXT_PUBLIC_URL + '/user/layout/' + layout._id)
        props.setLayout(data)
    }

    const onFavorite = () => {

    }

    let layouts = [...props?.user?.layoutMeta?.layouts]

    return (
        <Wrapper>
            {layouts.map((layout) => {
                return (
                    <Layout key={layout._id || layout.name}>
                        <Name 
                            onClick={() => onSelect({...layout})}
                        > 
                            {layout.name}  
                        </Name>  
                        <LayoutButtons>
                            <UilPen/>
                            <UilStar/>
                        </LayoutButtons>
                    </Layout>
                )
            })}
            {props.layouts.length == 0 && 
            <Nothing>
                <p> No Saved Layouts </p> 
            </Nothing>}
        </Wrapper>
    )
}

export default LayoutLoad
import styled from "styled-components";
import { Section } from "./Checklist";
import { Wrapper } from "./Item";
import { UilTrashAlt } from '@iconscout/react-unicons'
import IconButton from "../../components/Buttons/IconButton";
const ChecklistMenuWrapper = styled(Wrapper)`
    p { 
        cursor: pointer;
    }
    p:hover{
        text-decoration: underline;
    }
`

const ChecklistMenuItem = ({checklist, setSelectedChecklist, deleteChecklist}) => {
    return (
        <ChecklistMenuWrapper
        key={checklist._id}
        onClick={() => {
            setSelectedChecklist(checklist)
        }}
        >
            <Section width='100%'>
                <p>
                    {checklist.name}
                </p>
                <IconButton
                    tooltip={'Delete '+ checklist.name}
                    onClick={(e) => {
                        e.stopPropagation()
                        deleteChecklist(checklist)
                    }}
                >
                    <UilTrashAlt/>
                </IconButton>
            </Section>
        </ChecklistMenuWrapper>
    )
}

export default ChecklistMenuItem
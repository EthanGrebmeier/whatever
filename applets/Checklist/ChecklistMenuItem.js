import styled from "styled-components";
import { Section } from "./Checklist";
import { Wrapper } from "./Item";
import { UilTrashAlt } from '@iconscout/react-unicons'
import IconButton from "../../components/Buttons/IconButton";
const ChecklistMenuWrapper = styled(Wrapper)`
    p { 
        cursor: pointer;
    }
`

const ChecklistMenuItem = ({checklist, setSelectedChecklistID, deleteChecklist}) => {
    return (
        <ChecklistMenuWrapper
        key={checklist._id}
        onClick={() => {
            setSelectedChecklistID(checklist._id)
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
import { useState } from "react";
import styled from "styled-components";
import ChecklistForm from "./ChecklistForm";
import { MenuButton } from "./Checklist";

const Wrapper = styled.div`

`


const ChecklistMenu = ({submitNewChecklist, checklists, setSelectedChecklistID}) => {

    const [inputTitle, setInputTitle] = useState('')
    const [showForm, setShowForm] = useState(false)

    return (
        <>
            <h2> Checklist Select </h2>
            {
                showForm ? (
                <ChecklistForm
                    inputTitle={inputTitle}
                    setInputTitle={setInputTitle}
                    submitForm={submitNewChecklist}
                    toggleForm={() => setShowForm(!showForm)}
                />
                )
                : 
                (
                <MenuButton
                    onClick={() => setShowForm(!showForm)}
                >
                    + Create New List
                </MenuButton>
                ) 
            }
            <ul>
                {Object.entries(checklists).map((i, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            setSelectedChecklistID(i[1]._id)
                        }}
                    >
                        {i[1].name}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ChecklistMenu
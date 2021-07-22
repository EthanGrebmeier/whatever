import { useState } from "react";
import styled from "styled-components";
import ChecklistForm from "./ChecklistForm";
import { MenuButton } from "./Checklist";
import ChecklistMenuItem from "./ChecklistMenuItem";

const ChecklistMenu = ({submitNewChecklist, checklists, setSelectedChecklistID, deleteChecklist}) => {

    const [inputTitle, setInputTitle] = useState('')
    const [showForm, setShowForm] = useState(false)

    const toggleForm = () => {
        setShowForm(!showForm)
        setInputTitle('')
    }

    return (
        <>
            <h2> Select A List </h2>
            {
                showForm ? (
                <ChecklistForm
                    inputTitle={inputTitle}
                    setInputTitle={setInputTitle}
                    submitForm={submitNewChecklist}
                    toggleForm={toggleForm}
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
                {checklists && checklists.map((checklist) => (
                    <ChecklistMenuItem
                        setSelectedChecklistID={setSelectedChecklistID}
                        checklist={checklist}
                        deleteChecklist={deleteChecklist}
                        key={checklist._id}
                    />
                ))}
            </ul>
        </>
    )
}

export default ChecklistMenu
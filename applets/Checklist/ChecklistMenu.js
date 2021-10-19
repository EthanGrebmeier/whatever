import { useState } from "react";
import styled from "styled-components";
import ChecklistForm from "./ChecklistForm";
import { MenuButton } from "./Checklist";
import ChecklistMenuItem from "./ChecklistMenuItem";

const ChecklistMenu = ({submitNewChecklist, checklists, setSelectedChecklist, deleteChecklist}) => {

    const [inputTitle, setInputTitle] = useState('')
    const [showForm, setShowForm] = useState(false)

    const toggleForm = () => {
        setInputTitle('')
    }

    const closeForm = () => {
        setShowForm(false)
        toggleForm()
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
                    closeForm={closeForm}
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
                        setSelectedChecklist={setSelectedChecklist}
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
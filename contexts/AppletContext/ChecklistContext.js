import { createContext, useContext, useEffect, useState } from "react";

const ChecklistContext = createContext(null);

export function ChecklistProvider(props){

  const [checklists, setChecklists] = useState([])

  useEffect(() => {
   console.log(checklists)
  }, [checklists])

  const fetchChecklistsSuccess = ({checklists}) => {
    setChecklists(checklists)
  }

  const createChecklist = ({checklist}) => {
    setChecklists([...checklists, checklist])
  }

  const deleteChecklist = ({checklist}) => {
    setChecklists([...checklists.filter((currentChecklist) => currentChecklist._id != checklist._id)])
  }

  const checkItem = ({checklist, item}) => {
    let checklistIndex = checklists.map((currentChecklist) => (currentChecklist._id)).indexOf(checklist._id)
    let itemIndex = checklists[checklistIndex].items.map(currentItem => (currentItem._id)).indexOf(item._id)
    let checklistsCopy = [...checklists]
    checklistsCopy[checklistIndex].items[itemIndex].isChecked = !checklists[checklistIndex].items[itemIndex].isChecked
    setChecklists(checklistsCopy)
  }

  const completeItem = ({checklist, item}) => {
    let checklistIndex = checklists.map((currentChecklist) => (currentChecklist._id)).indexOf(checklist._id)
    let itemIndex = checklists[checklistIndex].items.map(currentItem => (currentItem._id)).indexOf(item._id)
    let checklistsCopy = [...checklists]
    checklistsCopy[checklistIndex].items[itemIndex].isCompleted = !checklists[checklistIndex].items[itemIndex].isCompleted
    setChecklists(checklistsCopy)
  }

  const createItem = ({checklist, item}) => {
    let checklistIndex = checklists.map((currentChecklist) => (currentChecklist._id)).indexOf(checklist._id)
    let newItem = {
        isChecked: false,
        isCompleted: false,
        ...item
      }
    let checklistsCopy = [...checklists]
    checklistsCopy[checklistIndex].items.push(newItem)
    setChecklists(checklistsCopy)
  }

  const deleteItem = ({checklist, item}) => {
    let checklistIndex = checklists.map((currentChecklist) => (currentChecklist._id)).indexOf(checklist._id)
    let checklistsCopy = [...checklists]
    checklistsCopy[checklistIndex].items = checklistsCopy[checklistIndex].items.filter(currentItem => currentItem._id != item._id)
    setChecklists(checklistsCopy)
 }

  const deleteAllItems = ({checklist}) => {
    let checklistIndex = checklists.map((currentChecklist) => (currentChecklist._id)).indexOf(checklist._id)
    let checklistsCopy = [...checklists] 
    checklistsCopy[checklistIndex].items = checklistsCopy[checklistIndex].items.filter(item => !item.isCompleted)
    setChecklists(checklistsCopy)
  }

  return (
    <ChecklistContext.Provider value={
      {
        checklists, 
        setChecklists,
        fetchChecklistsSuccess,
        createChecklist,
        deleteChecklist,
        checkItem,
        completeItem,
        createItem,
        deleteItem,
        deleteAllItems
      }
      }>
      {props.children}
    </ChecklistContext.Provider>
  );
}


export const useChecklistContext = () => useContext(ChecklistContext)

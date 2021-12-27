import { createContext, useContext, useEffect, useState } from "react";

const ChecklistContext = createContext(null);

export function ChecklistProvider(props){

  const [checklists, setChecklists] = useState([
    {
        "name": "test",
        "_id": "61ca097708fa3d000034fa2a",
        "items": [
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "61ca097a08fa3d000034fa2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "1"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "6a2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "61ca000034fa2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "617a0824000034fa2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "61ca0972b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "617a08fa3120034fa2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "61ca097a08fa34f2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "617a08fa3d0re4fa2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "61ca014fa2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "617a082wer4000034fa2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "61ca09qw72b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "617a08frewa3120034fa2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "61ca097a0qweqwr8fa34f2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "617a08fa3dfsdfsd0re4fa2b"
            },
            {
                "isChecked": false,
                "isCompleted": false,
                "title": "123",
                "date": "",
                "_id": "61ca01qwe1234fa2b"
            },
        ]
    }
])

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

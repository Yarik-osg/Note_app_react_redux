const initialState = [
    {
        id: 0,
        name: "Note1",
        date: "28.04.2002",
        category: "Task",
        content: "Content1",
        archive:0
    },
    {
        id: 2,
        name: "Note2",
        date: "30.04.2002",
        category: "Random",
        content: "Content2",
        archive:0
    },
    {
        id: 3,
        name: "Note3",
        date: "28.04.2012",
        category: "Mission",
        content: "Content3",
        archive:0
    },
    {
        id: 4,
        name: "Note4",
        date: "25.04.2012",
        category: "Task",
        content: "Content4",
        archive:0
    },
    {
        id: 5,
        name: "Note5",
        date: "25.10.2012",
        category: "Task1",
        content: "Content5",
        archive:0
    },
    {
        id: 6,
        name: "Note6",
        date: "25.04.2022",
        category: "Task",
        content: "Content6",
        archive:0
    },
    {
        id: 7,
        name: "Note7",
        date: "01.04.2012",
        category: "Task2",
        content: "Content8",
        archive:0
    },
]

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_NOTE":
            state = [...state, action.payload]
            return state
        case "DELETE_NOTE":
            const filterNotes = state.filter((note) =>
                note.id === action.payload ? null:note
            )
            state = filterNotes
            return state
        case "EDIT_NOTE":
            const updateState = state.filter((note) =>
                note.id === action.payload.id ?
                    Object.assign(note,action.payload) : note)
            state = updateState
            return state
        case "ARCHIVE_NOTE":
            const archiveState = state.filter((note) =>(
                note.id === action.payload ? (note.archive=1,note): note
            ))
            state = archiveState
            return state
        case "UNARCHIVE_NOTE":
            const unArchiveState = state.filter((note) =>(
                note.id === action.payload ?( note.archive=0, note): note
            ))
            state = unArchiveState
            return state
        default:
            return state
    }
}


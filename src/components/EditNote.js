import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {connect} from "react-redux";

const EditNote = ({notes, editNote}) => {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")
    const [content, setContent] = useState("")


    const history = useHistory()
    const {id} = useParams()

    const currentNote = notes.find((notes) => notes.id === parseInt(id))

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name || !date || !content) {
            return toast.warning("Please fill in all fields!")
        }
        const data = {
            id: parseInt(id),
            name,
            category,
            date,
            content,


        }
        editNote(data)
        toast.success("Note updated")
        history.push("/")

    }
    useEffect(() => {
        if (currentNote) {
            setName(currentNote.name)
            setCategory(currentNote.category)
            setDate(currentNote.date)
            setContent(currentNote.content)
        }
    }, [currentNote])

    return (
        <div className="container">
            <div className="row d-flex flex-column">
                <button
                    className="btn btn-dark ml-auto my-5"
                    onClick={() => history.push("/")}
                >
                    Return
                </button>

                <div className="col-md-6 shadow mx-auto p-5">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                   placeholder="Name"
                                   className="form-control"
                                   value={name}
                                   onChange={(event => setName(event.target.value))}/>
                        </div>
                        <div className="form-group">
                            <input type="date"
                                   placeholder="Date"
                                   className="form-control"
                                   value={date}
                                   onChange={(event => setDate(event.target.value))}/>
                        </div>
                        <div className="form-group">
                            <select id="note-select"
                                    className="form-control"
                                    name="select"
                                    value={category}
                                    onChange={(event => setCategory(event.target.value))}>
                                <option value="Task" placeholder="Task" selected/>
                                <option value="Random Thought" placeholder="Random Thought"/>
                                <option value="Idea" placeholder="Idea"/>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   placeholder="Content"
                                   className="form-control"
                                   value={content}
                                   onChange={(event => setContent(event.target.value))}/>
                        </div>
                        <div className="form-group d-flex align-items-center justify-content-between my-2">
                            <button type="submit"
                                    className="btn btn-primary">
                                Update Note
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => history.push("/")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    notes: state,
});
const mapDispatchToProps = (dispatch) => ({
    editNote: (data) => {
        dispatch({type: "EDIT_NOTE", payload: data});
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
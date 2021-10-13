import React, {useState} from "react";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const AddNote = ({notes,addNote}) => {
    const [name,setName]=useState("")
    const [category,setCategory]=useState("")
    const [date,setDate]=useState("")
    const [content,setContent]=useState("")
    const [archive,setArchive]=useState(0)

    const history = useHistory()

    const handleSubmit = (event)=>{
        event.preventDefault()
        if(!name || !date || !content){
            return toast.warning("Please fill in all fields!")
        }
        const data ={
            id:  notes.length > 0 ? notes[notes.length - 1].id + 1 : 0,
            name,
            category,
            date,
            content,
            archive

        }
        addNote(data)
        toast.success("Note added")
        history.push("/")
    }
    return (
        <div className="container-fluid">
            <h1 className="text-center text-dark py-3 display-2">Add Note</h1>
            <div className="row">
                <div className="col-md-6 mx-auto p-5 shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                   placeholder="Name"
                                   className="form-control"
                            value={name}
                            onChange={event => setName(event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="date"
                                   placeholder="Date"
                                   className="form-control"
                                   value={date}
                                   onChange={event => setDate(event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <select className="form-control"
                                    name="select"
                                    value={category}
                                    onChange={event => setCategory(event.target.value)}>
                                <option value="" hidden/>
                                <option value="Task" >Task</option>
                                <option value="Random Thought">Random Thought</option>
                                <option value="Random Thought" >Idea</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   placeholder="Content"
                                   className="form-control"
                                   value={content}
                                   onChange={event => setContent(event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="submit"
                                   value="Add Note"
                                   className="btn btn-block btn-dark"/>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
  notes:state
})

const mapDispatchToProps = (dispatch) => ({
  addNote:(data)=>{
      dispatch({type:"ADD_NOTE",payload:data})
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(AddNote)
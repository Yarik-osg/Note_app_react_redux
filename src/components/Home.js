import React, {useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const Home = ({notes, deleteNote,archiveNote,unArchiveNote}) => {
    let [Task, setTask] = useState(0)
    let [Random, setRandom] = useState(0)
    let [ArchiveTask, setArchiveTask] = useState(0)
    let [ArchiveRandom, setArchiveRandom] = useState(0)
    const Count = () => {
        setTask(Task-=Task)
        setRandom(Random -=Random)//0 not working......
        setArchiveTask(ArchiveTask-=ArchiveTask)
        setArchiveRandom(ArchiveRandom-=ArchiveRandom)
        console.log(Task)
        notes.map((note) => {
            if (note.category === "Task" && note.archive===0)
                setTask(Task+=1)
            else if (note.category === "Task" && note.archive===1)
                setArchiveTask(ArchiveTask +=1)
            else if (note.archive===0)
                setRandom(Random+=1)
            else if (note.archive===1)
                setArchiveRandom(ArchiveRandom+=1)
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="row d-flex flex-column">
                    <Link to="/add" className="btn btn-outline-dark my-5 ml-auto">
                        Add Note
                    </Link>
                    <button type="button" onClick={() => Count()} className="btn btn-outline-dark">Summary
                    </button>

                </div>
                <div className="col-md-10 mx-auto my-4">
                    <table className="table table-hover">
                        <thead className="table-header bg-dark text-white">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Date</th>
                            <th scope="col">Content</th>
                            <th scope="col">Action</th>

                        </tr>
                        </thead>
                        <tbody>
                        {notes.map((note, id) => {
                            if(note.archive===0){
                            return(<tr key={id}>
                            <td>{id + 1}</td>
                            <td>{note.name}</td>
                            <td>{note.category}</td>
                            <td>{note.date}</td>
                            <td>{note.content}</td>
                            <td>
                            <button type="button" onClick={() => archiveNote(note.id)}
                            className="btn btn-sm btn-success">Archive
                            </button>
                            <Link to={`/edit/${note.id}`} className="btn btn-sm btn-primary mr-1">Edit </Link>
                            <button type="button" onClick={() => deleteNote(note.id)}
                            className="btn btn-sm btn-danger">Delete
                            </button>

                            </td>
                            </tr>
                            )}})}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-10 mx-auto my-4">
                    <table className="table table-hover">
                        <thead className="table-header bg-dark text-white">
                        <tr>

                            <th scope="col">Category</th>
                            <th scope="col">Active</th>
                            <th scope="col">Archive</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Task</td>
                            <td>{Task}</td>
                            <td>{ArchiveTask}</td>
                        </tr>
                        <tr>
                            <td>Random Thought</td>
                            <td>{Random}</td>
                            <td>{ArchiveRandom}</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div className="col-md-10 mx-auto my-4">
                    <table className="table table-hover">
                        <thead className="table-header bg-dark text-white">
                        <tr>
                            <th scope="col">Archived #</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Date</th>
                            <th scope="col">Content</th>
                            <th scope="col">Action</th>

                        </tr>
                        </thead>
                        <tbody>
                        {notes.map((note, id) => {
                            if(note.archive===1) {
                                return (<tr key={id}>
                                    <td>{id + 1}</td>
                                    <td>{note.name}</td>
                                    <td>{note.category}</td>
                                    <td>{note.date}</td>
                                    <td>{note.content}</td>
                                    <td>
                                        <button type="button" onClick={() => unArchiveNote(note.id)}
                                                className="btn btn-sm btn-success">UnArchive
                                        </button>

                                    </td>
                                </tr>
                                )}})}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    notes: state,
});

const mapDispatchToProps = (dispatch) => ({
    deleteNote: (id) => {
        dispatch({type: "DELETE_NOTE", payload: id});
    },
    archiveNote:(id)=>{
        dispatch({type:"ARCHIVE_NOTE",payload: id})
},
    unArchiveNote:(id)=>{
        dispatch({type:"UNARCHIVE_NOTE",payload: id})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
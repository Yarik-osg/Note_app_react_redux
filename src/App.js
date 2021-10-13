import React from "react";
import './App.css';
import {ToastContainer} from "react-toastify";
import Navbar from "./components/Navbar";
import {Route} from "react-router-dom";
import Home from "./components/Home";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";

const App = () => {
    return (
        <div className="App">
            <ToastContainer />
            <Navbar />
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/add" component={() => <AddNote />} />
            <Route exact path="/edit/:id" component={() => <EditNote />} />
        </div>
    );
};

export default App;

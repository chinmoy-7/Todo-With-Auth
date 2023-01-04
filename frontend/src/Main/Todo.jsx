import React from "react";
import delIcon from "../imgs/delete.png";
import edit from "../imgs/edit.png";
import axios from "axios";
import { useState } from "react";
import "./todoBig.css";
import "./todo.css";
import { useEffect } from "react";
import { useAuth } from "../context/Auth";
import {useNavigate,Navigate} from 'react-router-dom'
export default function Todo() {
  const auth = useAuth()
  const navigate=useNavigate();
  const [task, setTask] = useState({ description: "" });
  const [taskAdded,setTaskAdded]=useState(false);
  const [editTask,setEditTask]=useState({description:"",id:""})
  const [isloading, setIsLoading] = useState(false);
  const [allTasks, setAllTasks] = useState();
  const [canEdit,setCanEdit]=useState(false);

  //re render after a new task is added
  useEffect(() => {
    getAllTask();
  }, [taskAdded]);

  //Add task
  const addTask = async (e) => {
    setIsLoading(true);
    const headers = { authorization: localStorage.getItem("token") };
    const newTask = await axios.post("http://localhost:3004/api/add", task, {
      headers,
    });
    setIsLoading(false);
    setTask({ description: "" });
    setTaskAdded(!taskAdded)
  };
  //Get all the tasks from database
  const getAllTask = async () => {
    setIsLoading(true);
    const headers = { authorization: localStorage.getItem("token") };
    const tasks = await axios.get("http://localhost:3004/api/tasks", {
      headers,
    });
    setIsLoading(false);
    // console.log("working");
    setAllTasks(tasks);
  };
  //Logout Function
  const handleLogout=()=>{
    window.localStorage.clear();
    auth.setIsLogin(false)
    navigate("/",{replace:true})
  }

  //handle Delete task
  const handleDelete=async (_id)=>{
    // console.log(_id)
    const headers = { authorization: localStorage.getItem("token") };
    await axios.delete(`http://localhost:3004/api/delete/${_id}`,{headers})
    setTaskAdded(!taskAdded)
  }

  //Edit button functionality
  const handleEdit=async (_id)=>{
    setCanEdit(true)
    // console.log(_id)
    setEditTask({...editTask,id:_id})
    // console.log(editTask.id)
  }
  const confirmEdit=async()=>{
    console.log(editTask)
    const headers = {"authorization":localStorage.getItem("token")}
    const edit=await axios.put(`http://localhost:3004/api/edit`,{editTask},{headers})
    // console.log(edit.data.message)
    setEditTask({description:""})
    setCanEdit(false)
    setTaskAdded(!taskAdded)
  }

  return (
    <>
      <div className="todo-container">
        <div className="todo-box">
          <div className="todo-header">
            <h2>To-do List</h2>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
          <div className="todo-tasks container-margin">
            <div className="add-todo">
              <input
                value={task.description}
                type="text"
                className="form-control"
                placeholder="Add Task"
                onChange={(e) => {
                  setTask({ description: e.target.value });
                }}
              />
              <button className="btn btn-success btn-md" onClick={addTask}>
                AddTask
              </button>
            </div>

            {/* <div className="todo-tasks container-margin"> */}
            {canEdit&&<div className="edit add-todo">
            <input
                value={editTask.description }
                type="text"
                className="form-control"
                placeholder="Edit Task"
                onChange={(e) => {
                  setEditTask({...editTask,description:e.target.value});
                }}
              />
              <button onClick={confirmEdit}  className="btn btn-primary btn-md" >
                EditTask
              </button>
              <button onClick={()=>{setCanEdit(false)}} className="btn btn-danger btn-md" >
                Cancel
              </button>
            </div>}
                {/* </div> */}

            {isloading && (
                <>
                  <div className="spinner-border text-success" role="status">
                    <span className="sr-only sm"></span>
                  </div>
                </>
              )}


            <div className="tasks-container ">
              {allTasks?.data?.map((item, id) => {
                return (
                  <div className="tasks" key={id}>
                    <div className="tasks-left">{id + 1}.</div>
                    <div className="tasks-middle">{item.description}</div>
                    <div className="tasks-right">
                      <img onClick={()=>{handleDelete(item._id)}} src={delIcon} alt="" />
                      <img onClick={()=>{handleEdit(item._id)}}src={edit} alt="" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

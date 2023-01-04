import React from "react";
import "./todoBig.css";
import delIcon from '../imgs/delete.png'
import edit from '../imgs/edit.png'
import axios from 'axios'
import { useState } from "react";
export default function Todo() {
  const [task,setTask]=useState({description:""})
  const addTask=async ()=>{
    // console.log(task)
    const headers={"authorization":localStorage.getItem("token")}
    const newTask = await axios.post("http://localhost:3004/api/add",task,{headers})
  }
  return (
    <>
      <div className="todo-container">
        <div className="todo-box">
          <div className="todo-header">
            <h2>To-do List</h2>
          </div>
          <div className="todo-tasks container-margin">
            <div className="add-todo">
              <input
                type="text"
                className="form-control"
                placeholder="Add Task"
                onChange={(e)=>{setTask({description:e.target.value})}}
              />
              <button className="btn btn-success btn-md" onClick={addTask}>AddTask</button>
            </div>
            <div className="tasks-container ">
              <div className="tasks">
                <div className="tasks-left">0</div>
                <div className="tasks-middle">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Atque consectetur molestiae nesciunt voluptatem quia aliquid.
                  Veniam perspiciatis amet commodi et?
                </div>
                <div className="tasks-right">
                  <img src={delIcon} alt="" />
                  <img src={edit} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

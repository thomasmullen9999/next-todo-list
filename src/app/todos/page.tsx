"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function todos() {

  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get("apis/todos").then((response) => {
      setTodos(response.data.todos)
    }).catch((error) => {
      console.log(error)
    })
  })

  async function addTodo() {
    const data = {
      desc: inputText
    }
    const resp = await axios.post("apis/todos", data);
    // setTodos([...todos, {desc: inputText, completed: false}])
  }

  async function clearTodos() {
    const resp = await axios.delete("apis/todos")
    setTodos([])
  }

  if (editMode) {
    return (
      <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
        <div className="text-2xl">Edit Todo</div>
        <div className="flex gap-4">
          <div className="text-lg">Edit Description</div>
          <input className="rounded-md shadow-md text-lg" type="text" placeholder="Enter new desc"/>
        </div>
        <div className="flex gap-4">
          <div className="text-lg">Edit completed:</div>
          <input type="checkbox" />
        </div>
        <button className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1">Submit</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
      <div className="text-2xl">Next Todo List</div>
      <div className="flex gap-2">
        <input className="text-xl rounded-md shadow-md" type="text" placeholder="Enter Todo" value={inputText} 
        onChange={(e) => {
          setInputText(e.target.value)
        }}/>
        <button onClick={addTodo} className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1">Add</button>
        <button onClick={clearTodos} className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1">Clear</button>
      </div>
      <div className="w-5/6 flex-col gap-2">
        {todos.map((todo, index) => {
          return (
            <div className="bg-violet-600 flex justify-between items-center p-2 rounded-lg shadow-md">
              <div className="flex gap-2">
                <input type="checkbox" checked={todo.completed} />
                <div className="text-lg text-white">{todo.desc}</div>
                <div className="flex gap-2">
                  <button className="text-xl shadow-md bg-green-600 text-white hover:bg-green-500 rounded-md px-1">Edit</button>
                  <button className="text-xl shadow-md bg-red-600 text-white hover:bg-red-500 rounded-md px-1">Delete</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};
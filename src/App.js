import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { Footer } from "./MyComponents/Footer";
import { About } from "./MyComponents/About";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am onDelete of todo", todo);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }))
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title, desc) => {
    let sno;
    if (todos.length == 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  return (
    <>
      <Router>

        <Header title="My Todos List" searchBar={false} />

        <Routes>

        <Route exact path="/" element={<Users />} />

          <Route exact path="/about" element={<About/>}/>

        </Routes>

        <Footer />

      </Router>
    </>
  );

  function Users() {
    return (
      <>
        <AddTodo addTodo={addTodo} />
        <Todos todos={todos} onDelete={onDelete} />
      </>);
  }
}


export default App;

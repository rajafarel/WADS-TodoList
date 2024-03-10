import "./App.css";
import Todo from "./pages/Todo";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Register from "./pages/register";
import Reset from "./pages/Reset";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/todo" element={<Todo />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
      
      </Routes>
    </Router>
  );
}

export default App;
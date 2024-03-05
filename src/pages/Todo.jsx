import "../App.css";
import { useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import TodoFilter from "../components/TodoFilter"; // Import the TodoFilter component

function Todo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  function addTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }

  function editTodo(id, newTitle) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  }
  function getFilteredTodos() {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'uncompleted':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <TodoFilter setFilter={setFilter} />
      <TodoList
        todos={getFilteredTodos()}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </>
  );
}

export default Todo;


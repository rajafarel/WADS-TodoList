import "../App.css";
import { useState, useEffect } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import TodoFilter from "../components/TodoFilter";
import { collection, addDoc, onSnapshot, query, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "todos")), (snapshot) => {
      const updatedTodos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(updatedTodos);
    });
    return () => unsubscribe();
  }, []);

  function addTodo(title) {
    addDoc(collection(db, "todos"), { title, completed: false })
      .then(() => {
        console.log("Todo successfully added!");
      })
      .catch((error) => {
        console.error("Error adding todo: ", error);
      });
  }

  function toggleTodo(id, completed) {
    const todoRef = doc(db, "todos", id);
    const newCompleted = !completed; // Toggle the completion status
  
    // Update completion status in Firebase
    updateDoc(todoRef, { completed: newCompleted })
      .then(() => {
        // Update local state (todos) with the updated completion status
        setTodos(prevTodos =>
          prevTodos.map(todo => {
            if (todo.id === id) {
              return { ...todo, completed: newCompleted };
            }
            return todo;
          })
        );
      })
      .catch(error => {
        console.error("Error toggling todo: ", error);
      });
  }
  
  
  
  
  
  
  
   
  

  function deleteTodo(id) {
    const todoRef = doc(db, "todos", id);
    deleteDoc(todoRef)
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        console.log("Todo successfully deleted!");
      })
      .catch(error => {
        console.error("Error deleting todo: ", error);
      });
  }

  function editTodo(id, newTitle) {
    const todoRef = doc(db, "todos", id);
    updateDoc(todoRef, { title: newTitle })
      .then(() => {
        setTodos(prevTodos =>
          prevTodos.map(todo => {
            if (todo.id === id) {
              return { ...todo, title: newTitle };
            }
            return todo;
          })
        );
        console.log("Todo successfully edited!");
      })
      .catch(error => {
        console.error("Error editing todo: ", error);
      });
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

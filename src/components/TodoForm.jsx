import { useState } from "react";

export function TodoForm({ addTodo }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem === "") return;

    addTodo(newItem);
    setNewItem("");
  }

  return (
    <div>
      <form className="new-item-form">
        <div className="form-row">
          <label className ={"uppercase text-2xl"}htmlFor="item">add new task</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button className="btn" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}

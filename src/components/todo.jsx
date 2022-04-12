import { useState } from "react";

function ToDo() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editItem, setEditItem] = useState(false);
  const [editableItem, setEditableItem] = useState(null);

  const creatTodoHandler = () => {
    if (todoTitle !== "") {
      const newTodo = {
        id: Date.now(),
        title: todoTitle,
        isComplete: false,
      };

      setTodoList([...todoList, newTodo]);
      setTodoTitle("");
    } else {
      alert("Enter valid Title");
    }
  };

  const deleteTodoHandler = (id) => {
    const newTodoList = todoList.filter((e) => e.id !== id);
    setTodoList(newTodoList);
  };

  const editTodoHandler = (id) => {
    const todoEdit = todoList.find((e) => e.id === id);
    setEditItem(true);
    setEditableItem(todoEdit);
    setTodoTitle(todoEdit.title);
  };
  const updateTodoHandler = () => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === editableItem.id) {
          todo.title = todoTitle;
        }
        return todo;
      })
    );
    setEditItem(false);
    setTodoTitle("");
    setEditableItem(null);
  };

  return (
    <div className="todo-app">
      <input
        type="text"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button
        onClick={() => {
          editItem ? updateTodoHandler() : creatTodoHandler();
        }}
      >
        {editItem ? "Update ToDo" : "Add ToDo"}
      </button>
      <ul className="todo-list">
        {todoList.map((todo) => (
          <li>
            <input type="checkbox" />
            <span>{todo.title}</span>
            <button onClick={() => editTodoHandler(todo.id)}>Edit</button>
            <button onClick={() => deleteTodoHandler(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ToDo;

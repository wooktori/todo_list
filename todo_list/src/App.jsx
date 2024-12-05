import { useEffect, useRef, useState } from "react";

export default function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      text: "공부하기",
      isDone: false,
      editState: false,
    },
    {
      id: 2,
      text: "밥먹기",
      isDone: false,
      editState: false,
    },
    {
      id: 3,
      text: "게임하기",
      isDone: false,
      editState: false,
    },
  ]);

  const [todo, setTodo] = useState("");
  const inputRef = useRef();
  const editRefs = useRef({});

  const handleEdit = (id, state) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, editState: !state } : todo
      )
    );
  };

  const handleSaveEdit = (id, newText) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, text: newText, editState: false } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    const newTodo = {
      id: todoList.length + 1,
      text: todo,
      isDone: false,
      editState: false,
    };
    setTodoList([...todoList, newTodo]);
    inputRef.current.focus();
    setTodo("");
  };

  useEffect(() => {
    todoList.forEach((todo) => {
      if (todo.editState && editRefs.current[todo.id]) {
        editRefs.current[todo.id].focus();
      }
    });
  }, [todoList]);

  return (
    <div>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {todo.editState ? (
              <input
                type="text"
                defaultValue={todo.text}
                ref={(el) => (editRefs.current[todo.id] = el)}
                onBlur={(e) => handleSaveEdit(todo.id, e.target.value)}
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <button onClick={() => handleEdit(todo.id, todo.editState)}>
              {todo.editState ? "완료" : "수정"}
            </button>
            <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
      <div>
        <input value={todo} onChange={handleChange} ref={inputRef} />
        <button onClick={handleAdd}>추가</button>
      </div>
    </div>
  );
}

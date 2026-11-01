import { useRef } from 'react';
import { useTodoStore } from './store/todoStore';

function App() {
  const inputRef = useRef(null);

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  const handleAdd = () => {
    const title = inputRef.current.value.trim();

    if (!title) return;

    addTodo(title);
    inputRef.current.value = '';
  };

  return (
    <div>
      <h1>Todo List</h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Введите задачу"
      />

      <button onClick={handleAdd}>
        Добавить
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />

            <span
              style={{
                textDecoration: todo.completed
                  ? 'line-through'
                  : 'none',
              }}
            >
              {todo.title}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
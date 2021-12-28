import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
import { Todo, HandleTodo, EdidTodo, AddTodo } from './types/types';

interface Props {
  initialTodos: Todo[];
}

const TodoApp: React.FC<Props> = ({ initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos);
  const toggleTodo: HandleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const addTodo: AddTodo = (text: string) => {
    if(text.trim() !== '') {
      const newTodo = { text, complete: false };
      setTodos([...todos, newTodo]);
    }
  };
  const removeTodo: HandleTodo = (selectedTodo) => {
    const newTodos = todos.filter((todo) => todo !== selectedTodo);
    setTodos(newTodos);
  };
  const editTodo: EdidTodo = (selectedTodo: Todo, text: string) => {
    if(!text || text.trim() === '') {
      return;
    }
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return { ...todo, text: text };
      }
      return todo;
    });
    setTodos(newTodos);
  };  
  return (
    <>
      <AddTodoForm addTodo={addTodo} />
      <TodoList 
        todos={todos} 
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
        editTodo={editTodo}
      />
    </>
  );
}

export default TodoApp;
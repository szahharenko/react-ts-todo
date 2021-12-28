import React, { useState } from 'react';
import { AddTodo } from './types/types';
import './assets/todo-form.css';

interface Props {
  addTodo: AddTodo;
}

export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState('');
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  }
  return (
    <form className='add-todo'>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit" onClick={handleSubmit} >Add Todo</button>
    </form>
  );
};
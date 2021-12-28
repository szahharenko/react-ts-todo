import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './todo-components/Todo';

ReactDOM.render(
  <React.StrictMode>
    <TodoApp initialTodos={[]} />
  </React.StrictMode>,
  document.getElementById('root')
);


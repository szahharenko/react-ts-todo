import React from 'react';
import { TodoListItem } from './TodoListItem';
import { Todo, HandleTodo, EdidTodo} from './types/types';
import './assets/todo-list.css';

interface Props {
  todos: Todo[];
  toggleTodo: HandleTodo;
  removeTodo: HandleTodo;
  editTodo: EdidTodo;
}

export const TodoList: React.FC<Props> = ({ todos, toggleTodo, removeTodo, editTodo }) => {
  return (
    <ul className='todos'>
      { todos.map( todo => 
        <TodoListItem key={todo.text} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} editTodo={editTodo} />
      ) }
    </ul>
  );
};
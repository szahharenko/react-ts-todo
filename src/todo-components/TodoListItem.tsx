import React, {useState} from 'react';
import { Todo, HandleTodo, EdidTodo} from './types/types';
import { FaCheck, FaEdit, FaTrashAlt, FaSave } from 'react-icons/fa';

interface Props {
  todo: Todo;
  toggleTodo: HandleTodo;  
  removeTodo: HandleTodo;
  editTodo: EdidTodo;
}

export const TodoListItem: React.FC<Props> = ({ todo, toggleTodo, removeTodo, editTodo }) => {
  const [editMode, toggleEdit] = useState(false);  
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = (todo: Todo) : void => {
    editTodo(todo, inputRef.current?.value || todo.text);
    toggleEdit(false);
  }
  return (
    <li className={ `todos__item ${todo.complete ? 'todos__item--complete' : 'todos__item--incomplete'}`}>
      <div className='todos__item__details'>
        { editMode ? 
          <input type="text" ref={inputRef} aria-label="Todo text"
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                handleChange(todo)
              }
            }}
          />
          : 
          <>
            <button 
              className={`${todo.complete ? 'checked' : ''}`} 
              onClick={ () => { toggleTodo(todo) } }
              aria-label="Complete task">
              <FaCheck />
            </button>
            <div>
              { todo.text }
            </div>
          </>
        }
      </div>
      <div className='todos__item__controls'>
        { editMode ? 
          <>
              <button className='save'
                onClick={ e => {
                  e.stopPropagation();
                  handleChange(todo);
                }}
                aria-label="Save task"
              ><FaSave/></button>
          </>      
          :        
          <>
            <button className='edit' 
              onClick={ e => {
                e.stopPropagation();
                toggleEdit(true);
              }}
              aria-label="Edit task"
            ><FaEdit /></button>
            <button className='remove'
              onClick={ e => {
                e.stopPropagation();
                removeTodo(todo);
              }}
              aria-label="Remove task"
            ><FaTrashAlt/></button>
          </>
        }
      </div>      
    </li>
  );
};
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { Todo } from './types/types';
import { shallow  } from 'enzyme';
import TodoApp from './Todo';

const initialTodos: Todo[] = [
    { text: 'Walk the dog',complete: false },
    { text: 'Write app', complete: false }
];

/* SOME GLOBAL FLOW TESTS */

describe('<TodoApp />', () => {
  afterEach(cleanup);

  it('hasn`t got changes', () => {
      const component = shallow(<TodoApp initialTodos={initialTodos}/>);
      expect(component).toMatchSnapshot();
  });

  it('be able to ADD TODO',  async () => {

      render(<TodoApp initialTodos={initialTodos}/>);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /Add Todo/i });
      const todoList = screen.getByRole('list');

      expect(input.getAttribute('value')).toEqual('');
      fireEvent.change(input, {target: {value: 'test'},});
      expect(input.getAttribute('value')).toEqual('test');
      fireEvent.click(button);
      expect(input.getAttribute('value')).toEqual('');
      expect(todoList.childNodes.length).toEqual(3);
  });

  it('be able to TOGGLE TODO',  async () => {
    const singleTodo = initialTodos[0];
    render(<TodoApp initialTodos={[singleTodo]}/>);

    const checkButton = screen.getByRole('button', { name: /Complete task/i });
        
    expect(checkButton.className).toEqual('');
    fireEvent.click(checkButton);
    expect(checkButton.className).toEqual('checked');
    fireEvent.click(checkButton);
    expect(checkButton.className).toEqual('');    
  });  

  it('be able to REMOVE TODO',  async () => {
    const singleTodo = initialTodos[0];
    render(<TodoApp initialTodos={[singleTodo]}/>);
    const todoList = screen.getByRole('list');
    const removeButton = screen.getByRole('button', { name: /Remove task/i });
        
    expect(removeButton.className).toEqual('remove');
    expect(todoList.childNodes.length).toEqual(1);
    fireEvent.click(removeButton);
    expect(todoList.childNodes.length).toEqual(0);
  });

  it('be able to EDIT TODO',  async () => {  
    const singleTodo = initialTodos[0];
    const newText = initialTodos[1].text;

    render(<TodoApp initialTodos={[singleTodo]}/>);
    
    const todoListItem = screen.getByRole('listitem');
    const editButton = screen.getByRole('button', { name: /Edit task/i });

    //first check initial render todo item value
    expect(todoListItem.textContent).toEqual(singleTodo.text);

    //then we click edit button, check if edit button and input appeared in document
    fireEvent.click(editButton);
    const todoInput = screen.getByRole('textbox', { name: /Todo text/i });    
    const saveButton = screen.getByRole('button', { name: /Save task/i });    
    expect(todoInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    //them we change input value, and checking if it's changed
    fireEvent.change(todoInput, {target: {value: newText}});
    expect(todoInput).toHaveValue(newText);

    //lastly we try to save new value
    fireEvent.click(saveButton);

    //edit button and input should disappeared from document
    expect(saveButton).not.toBeInTheDocument();    
    expect(todoInput).not.toBeInTheDocument();

    //todo item value should be updated
    //expect(todoListItem.textContent).toEqual(newText);

  });

  //etc
  
})
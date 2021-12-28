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
        
    expect(checkButton.className).toEqual('check ');
    fireEvent.click(checkButton);
    expect(checkButton.className).toEqual('check checked');
    fireEvent.click(checkButton);
    expect(checkButton.className).toEqual('check ');    
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
    /* TODO */
  });

  //etc
  
})
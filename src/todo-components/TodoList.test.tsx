import { mount } from 'enzyme'
import { TodoList } from './TodoList';
import { HandleTodo, EdidTodo, Todo } from './types/types';

describe('<TodoList />', () => {

    const handleTodo: HandleTodo = (todoItem: Todo) => undefined;
    const edidTodo: EdidTodo = (todoItem: Todo, text: string) => undefined;    
        
    const initialTodos: Todo[] = [
        { text: 'Walk the dog',complete: false },
        { text: 'Write app', complete: true }
    ];
    const container = mount(<TodoList todos={initialTodos} toggleTodo={handleTodo} removeTodo={handleTodo} editTodo={edidTodo} />);

    it('should match the SNAPSHOT', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have an todo ITEM LIST', () => {
        expect(container.find('.todos').length).toEqual(1);
    });

    it('should have TWO items in the list', () => {
        expect(container.find('.todos li').length).toEqual(2);
    });
    
});
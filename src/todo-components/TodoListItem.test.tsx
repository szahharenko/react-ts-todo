import { shallow } from 'enzyme'
import { TodoListItem } from './TodoListItem';
import { HandleTodo, EdidTodo, Todo } from './types/types';

describe('<TodoListItem />', () => {

    const handleTodo: HandleTodo = (todoItem: Todo) => undefined;
    const edidTodo: EdidTodo = (todoItem: Todo, text: string) => undefined;    
    const completedTask  = { text: 'Walk the dog',complete: true };
    const incompleteTask = { text: 'Write app', complete: false };    

    const completedContainer = shallow(<TodoListItem todo={completedTask} toggleTodo={handleTodo} removeTodo={handleTodo} editTodo={edidTodo} />);
    const incompleteContainer = shallow(<TodoListItem todo={incompleteTask} toggleTodo={handleTodo} removeTodo={handleTodo} editTodo={edidTodo} />);        

    it('should match the SNAPSHOT', () => {
        expect(completedContainer.html()).toMatchSnapshot();
    });

    it('should show COMPLETE item', () => {
        expect(completedContainer.find('li.todos__item--complete').length).toEqual(1);
    });

    it('should NOT have COMPLETE item', () => {
        expect(incompleteContainer.find('li').length).toEqual(1);              
        expect(incompleteContainer.find('.todos__item--complete').length).toEqual(0);
    });
    
});
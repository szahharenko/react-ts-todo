import { shallow } from 'enzyme';
import { AddTodoForm } from './AddTodoForm';
import { AddTodo } from './types/types';

describe('<AddTodoForm />', () => {

    const addTodo: AddTodo = (text: string) => undefined;

    const container = shallow(<AddTodoForm addTodo={addTodo} />);
    it('should match the SNAPSHOT', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have an INPUT FIELD', () => {
        expect(container.find('input[type="text"]').length).toEqual(1);
    });

    it('should have an BUTTON', () => {
        expect(container.find('button').length).toEqual(1);
    });

});
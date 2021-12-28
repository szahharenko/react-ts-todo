
export interface Todo {
    text: string;
    complete: boolean;
}
export type AddTodo = (text: string) => void;
export type HandleTodo = (selectedTodo: Todo) => void;
export type EdidTodo = (selectedTodo: Todo, text: string) => void;;
import './styles.css';

import { Todo, TodoList } from './class/index';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();
// const tarea = new Todo('Aprender Javascript!!');

todoList.todos.forEach( crearTodoHtml );
// todoList.todos.forEach( todo => { crearTodoHtml( todo ); });

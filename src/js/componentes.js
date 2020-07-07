import { Todo  } from '../class/index';
import { todoList } from '../index';

// Referencias de Html.
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
        <li class="${ (todo.completado)? 'completed' : '' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado)? 'checked' : '' }>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

// Eventos.
txtInput.addEventListener('keyup', ( event ) => {
    if( event.keyCode === 13 && txtInput.value.length > 0 ){
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => {
    const nombreElemento = event.target.localName; // Obtiene nombre del evento. input, button, label
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input') ){ // Click en el check.
        todoList.marcarCompletado( todoId ); // Busca y marca id.
        todoElemento.classList.toggle('completed'); // Tarcha el elemento como completado.
    }
    else if( nombreElemento.includes('button') ){ // Hay que borrar el todo.
        todoList.eliminarTodo( todoId ); // Eliminamos elemento de la lista.
        divTodoList.removeChild( todoElemento ); // Eliminamos el elemento html.
    }
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletado();

    for( let i = divTodoList.children.length-1; i >= 0; i-- ){
        const element = divTodoList.children[i];

        if(element.classList.contains('completed'))
            divTodoList.removeChild( element );
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if( !filtro ) { return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const element of divTodoList.children ){
        element.classList.remove('hidden');

        const completado = element.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if( completado ) { element.classList.add('hidden'); }
                break;
            case 'Completados':
                if( !completado ) { element.classList.add('hidden'); }
                break;
        }
    }
});
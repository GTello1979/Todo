
export class Todo{
    static fromJson({ id, tarea, completado, creado }){
        const todoTemp = new Todo( tarea );

        todoTemp.id         = id;
        todoTemp.completado = completado;
        todoTemp.creado     = creado;

        return todoTemp;
    }

    constructor( tarea ){
        this.tarea = tarea;
        this.completado = false;
        this.id = new Date().getTime();
        this.creado = new Date();
    }

    imprimirClase(){
        console.log(`${ this.tarea } - ${ this.id }`);
    }
}
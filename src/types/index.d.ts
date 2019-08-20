type todo = {
    id?: number,
    text?: string,
    complete?: boolean
}
type todo_handle = (x: todo) => void


interface Iinit {
    init: (x: IController) => void
}

interface IView {
    on: (eventType: string, fn: todo_handle) => void,
    DisplayTodos: (todos: Array<todo>) => void,

}
interface IModel {
    Add(x: todo): void,
    Edit(x: todo): void,
    Del(x: todo): void,
    bindChaneg(cb: (arr: Array<todo>) => void): void
}
interface IController {
    // [index: string]: any
    view?: IView,
    model?: IModel
}
interface Ioptions {
    [index: string]: any
    Ready(c: IController): void
}


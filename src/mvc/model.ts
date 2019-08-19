export default class Model {
    public todos: Array<todo> = []
    public onChange?: (todos: Array<todo>) => void
    constructor() {
        const cache = localStorage.getItem('todos')
        if (cache)
            this.todos = JSON.parse(cache)
    }
    bindChaneg(cb: (arr: Array<todo>) => void) {
        (this.onChange = cb)(this.todos)

    }
    private _commit() {
        this.onChange && this.onChange(this.todos)
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }
    public Add = ({ text }: todo) => {
        if (!text) return
        const length = this.todos.length, x: todo = { text, complete: false }
        x.id = length > 0 ? this.todos[length - 1].id! + 1 : 1
        this.todos.push(x)
        this._commit()
    }
    public Edit = ({ id, text, complete }: todo) => {
        let x = this.todos.find(x => x.id === id)
        if (!x) return
        if (text !== undefined) x.text = text;
        if (complete !== undefined) x.complete = complete;
        this._commit()
    }
    public Del = ({ id }: todo) => {
        this.todos = this.todos.filter(x => x.id !== id)
        this._commit()
    }
}
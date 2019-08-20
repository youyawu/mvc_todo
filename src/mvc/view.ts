const createElement = (tag: string, className?: string) => {
    const dom = document.createElement(tag);
    if (className !== undefined)
        dom.classList.add(className)
    return dom
},
    getEle = (selector: string) => document.querySelector(selector)

class View implements IView {



    private list: HTMLElement

    constructor() {
        const body = getEle('body')!,
            root = createElement('div', 'root'),
            title = createElement('h1'),
            form = createElement('form') as HTMLFormElement,
            input = createElement("input") as HTMLInputElement,
            btn = createElement('button'),
            list = createElement('ul', 'todolist')
        title.textContent = 'Todos'
        btn.textContent = '提交'
        form.append(input, btn)
        root.append(title, form, list)
        body.appendChild(root)

        this.register(form, 'submit', (e: Event) => {
            let text = input.value;
            if (!text) return
            //  handle(this._text)
            this._emit('add', { text })
            input.value = ''
            e.preventDefault()
        })

        this.register(list, 'click', ({ target }) => {
            let ele = (target! as HTMLElement)
            if (ele.className === 'delete') {
                let id = Number(ele.parentElement!.id)
                id && this._emit('del', { id })
            }
        })

        this.register(list, 'focusout', ({ target }) => {
            const span = (target as HTMLElement),
                text = span.textContent!,
                id = Number(span.parentElement!.id!)
            span.tagName.toLocaleLowerCase() == "span" && this._emit('edit', { text, id })
        })
        this.register(list, 'change', ({ target }) => {
            const input = target as HTMLInputElement,
                complete = input.checked,
                id = Number(input.parentElement!.id!)
            this._emit('edit', { complete, id })
        })

        this.list = list
    }


    private register(taget: HTMLElement, type: string, handle: (e: Event) => void) {
        taget.addEventListener(type, handle)
    }

    private _handles: {
        [index: string]: Array<todo_handle>
    } = {}

    private _emit(subject: string, x: todo) {
        let handles = this._handles[subject] || (this._handles[subject] = [])
        handles.forEach(handle => handle(x))
    }
    public on(subject: string, fn: todo_handle) {
        let handles = this._handles[subject] || (this._handles[subject] = [])
        handles.push(fn)
    }
    public DisplayTodos = (todos: Array<todo>) => {
        let arr: Array<HTMLElement> = []
        todos.forEach(({ id, text, complete = false }) => {
            const li = createElement('li'),
                chebox = createElement('input') as HTMLInputElement,
                span = createElement('span'),
                s = createElement('s'),
                del = createElement('button', 'delete')
            let t: HTMLElement
            li.id = id!.toString()
            chebox.type = 'checkbox'
            del.textContent = 'Del'
            if (chebox.checked = complete) {
                s.textContent = text!
                t = s
            } else {
                span.textContent = text!
                span.contentEditable = 'true'
                t = span
            }
            t.className = "text"

            li.append(chebox, t, del)
            arr.push(li)
        })
        if (arr.length) {
            //this.list.innerHTML = ''
            while (this.list.firstChild)
                this.list.removeChild(this.list.firstChild)
            this.list.append.apply(this.list, arr)
        }
        else this.list.innerHTML = 'Nothing to do! Add a task?';

    }
    public init(x: IController) {
        x.view = new View()
    }

}
let x: Iinit = {
    init(c) {
        c.view = new View
    }
}

export default x 
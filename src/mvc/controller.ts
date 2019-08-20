// import view from './view'
// import model from './model'

// export default class Controller {
//     constructor(public v: view, public m: model) {
//         v.on('add', m.Add)
//         v.on('edit', m.Edit)
//         v.on('del', m.Del)
//         m.bindChaneg(v.DisplayTodos)
//     }
// }

export default class Controller implements IController {
    public model: IModel | undefined
    public view: IView | undefined
    static moduels: Array<Iinit> = []
    constructor({ Ready }: Ioptions) {
        this.initModules()
        Ready && Ready(this)
    }
    static use(moduel: Iinit | Array<Iinit>) {
        if (Array.isArray(moduel))
            return moduel.forEach(x => this.moduels.push(x))
        this.moduels.push(moduel)

    }
    private initModules() {
        Controller.moduels.forEach(x => x.init(this))
    }
}
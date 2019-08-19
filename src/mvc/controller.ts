import view from './view'
import model from './model'

export default class Controller {
    constructor(public v: view, public m: model) {
        v.on('add', m.Add)
        v.on('edit', m.Edit)
        v.on('del', m.Del)
        m.bindChaneg(v.DisplayTodos)
    }
}
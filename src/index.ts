import './styles/index.scss'
import view from './mvc/view'
import model from './mvc/model'
import controller from './mvc/controller'

controller.use([view, model])
const app = new controller({
    Ready({ model, view }) {
        if (!model || !view)
            return console.error('参数错误')
        view.on('add', model.Add)
        view.on('edit', model.Edit)
        view.on('del', model.Del)
        model.bindChaneg(view.DisplayTodos)
    }
})






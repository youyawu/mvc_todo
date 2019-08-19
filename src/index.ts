import './styles/index.scss'
import view from './mvc/view'
import model from './mvc/model'
import controller from './mvc/controller'

const app = new controller(new view(), new model())









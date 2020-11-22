import {
    Router
} from 'express'

import ComplainController from './controllers/ComplainHandlerController'
import CSController from './controllers/CustomerServiceController'
import CommentController from './controllers/CommentHandlerController'

const routes = Router()

// Complaint Controller
routes.post('/mail', ComplainController.sendEmail)
routes.get('/ticket', ComplainController.getComplainTicket)
routes.get('/rand', ComplainController.getRandTicket)

// Comment Controller
routes.post('/comment', CommentController.addComment)
routes.put('/update_comment', CommentController.updateComment)

// CS Controller
routes.get('/cs', CSController.getAll)
routes.post('/add', CSController.addCs)
routes.put('/update', CSController.updateCs)
// routes.post('/delete', CSController.deleteCs)
routes.put('/disable', CSController.dissableCs)

// add customer
routes.post('add/customer', CSController.addCustomer)

export default routes
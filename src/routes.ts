import {
    Router
} from 'express'

import EmailController from './controllers/SendEmailController'

const routes = Router()

routes.get('/send', EmailController.sendEmail)

export default routes
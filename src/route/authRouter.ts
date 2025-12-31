import Router from 'express';
import { check } from 'express-validator';
import { loginController } from '../controller/loginController';
import { registrationController } from '../controller/registrationController';
import { getUsersController } from '../controller/usersController';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
const routes = Router();


routes.post('/login', loginController);

routes.post('/registration', check('username', "Name cannot be empty").notEmpty(), 
check('password', "The password must be more than 4 and less than 10 characters.").isLength({ min: 4, max: 10 }),registrationController);

routes.get('/users', roleMiddleware(['ADMIN']), getUsersController);

export { routes };
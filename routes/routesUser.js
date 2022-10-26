
import {Router} from 'express'

import { verifyToken } from '../middlewares/auth.js'

import {getUsers,getUser,addUser,editUser,deleteUser } from '../controllers/userControllers.js'
 
const router = Router()
// *Verbos HTTPS

router.get('/all',getUsers)

router.get('/', getUser)

router.post('/',addUser)

router.put('/',editUser)

router.delete('/:rut',deleteUser)

//:var = variable .params (ej: http://localhost:3000/api/usuario/21234325-2 )
export default router;

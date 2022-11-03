
import {Router} from 'express'

import { verifyToken } from '../middlewares/auth.js'

import {getUser,addUser,editUser,deleteUser,getUsersNew } from '../controllers/userControllers.js'
 
const router = Router()
// *Verbos HTTPS

// router.get('/all',getUsers)

router.get('/', getUser)

router.get('/all', getUsersNew)

router.post('/',addUser)

router.put('/',editUser)

router.delete('/:rut',deleteUser)

//:var = variable .params (ej: http://localhost:3000/api/usuario/21234325-2 )
export default router;


import {Router} from 'express'

import { verifyToken } from '../middlewares/auth.js'

import {getUsers,getUser,addUser,editUser,deleteUser } from '../controllers/userControllers.js'
 
const router = Router()
// *Verbos HTTPS

router.get('/all',getUsers)

router.get('/', [ verifyToken ], getUser)

router.post('/',addUser)

router.put('/',editUser)

router.delete('/',deleteUser)

export default router;

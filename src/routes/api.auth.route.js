import { Router } from "express"
import { APILogIn,
        APILSignUp } 
        from "../controllers/auth.controller.js";
import * as  authHelp from "../helpers/auth.helper.js";        

const router = Router()

router.post('/api/auth/login', APILogIn)
router.post('/api/auth/signup', APILSignUp);
router.get('/api/auth/validateToken', authHelp.validToken, (req, res) => {
        res.json('Token Valido')
});

export default router
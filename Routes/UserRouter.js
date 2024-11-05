import express from 'express';
import { deleteUser, editUser, getEditUser, getHome, LoginUser, RegisterUser } from '../Controller/UserController.js';

export const router = express.Router();

// Register route
router.post('/register', RegisterUser);
router.post('/login', LoginUser) 
router.get('/home',getHome)
router.delete('/home/:userId',deleteUser)
router.get('/editUser/:id',getEditUser)
router.patch('/editUser/:id',editUser)

export default router
import express from 'express';
import {admin,del,setadmin,removeadmin} from '../controllers/adminController';
import  isAdmin from '../config/isLoggedIn';

 var router=express.Router();

router.get('/admin',isAdmin.isLoggedIn,admin);

router.get('/admin/delete/:username',isAdmin.isLoggedIn,del);
router.get('/admin/setadmin/:username',isAdmin.isLoggedIn,setadmin);
router.get('/admin/removeadmin/:username',isAdmin.isLoggedIn,removeadmin);
module.exports=router;
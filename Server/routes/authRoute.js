import express from "express"
import {registerController,loginController,testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from "../controller/authController.js"
import {isAdmin, requiresignIN} from "../middlewares/authMiddleware.js"
//router object

const router= express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register',registerController);

//LOGIN || METHOD POST
router.post('/login',loginController);


//Forgot Password || POST
router.post('/forgot-password',forgotPasswordController);

router.get('/test',requiresignIN,isAdmin,testController);



//protected route auth
router.get("/user-auth",requiresignIN,(req,res)=>{
    res.status(200).send({ok:true});
})

//protected Admin route auth

router.get("/admin-auth",requiresignIN,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

//update profile

router.put('/profile',requiresignIN,updateProfileController);

//orders
router.get('/orders',requiresignIN,getOrdersController)

//all orders
router.get('/all-orders',requiresignIN,isAdmin,getAllOrdersController)

//order status update
router.put('/order-status/:orderId',requiresignIN,isAdmin,orderStatusController)

export default router
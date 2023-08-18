import express from 'express'
import { isAdmin, requiresignIN } from '../middlewares/authMiddleware.js'
import { categoryController, createCategoryController ,deleteCategoryController,singleCategoryController,updateCategoryController} from '../controller/createCategoryController.js'
const router =express.Router()


//routes
//create category
router.post('/create-category',requiresignIN,isAdmin,createCategoryController)
//update category
router.put("/update-category/:id",requiresignIN,isAdmin,updateCategoryController)
export default router
//get all category
router.get('/get-category',categoryController);
//get single category
router.get('/single-category/:slug',singleCategoryController);
//delete category
router.get('/delete-category/:id',requiresignIN,isAdmin,deleteCategoryController);
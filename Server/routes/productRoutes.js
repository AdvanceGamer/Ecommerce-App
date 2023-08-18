import express from 'express'
import {isAdmin, requiresignIN} from '../middlewares/authMiddleware.js'
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controller/productController.js';
import formidable from'express-formidable'
const router =express.Router();

//routes


// create products
router.post('/create-product',requiresignIN,isAdmin,formidable(),createProductController);

// get products
router.get('/get-product',getProductController)

// get single product
router.get('/get-product/:slug',getSingleProductController)

// get photo
router.get('/product-photo/:pid',productPhotoController);

// delete product

router.get('/delete-product/:pid',deleteProductController);


//update product
router.put('/update-product/:pid',requiresignIN,isAdmin,formidable(),updateProductController);

//filter product
router.post('/product-filters',productFilterController);


// product count
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page',productListController);

//search product
router.get('/search/:keyword',searchProductController);

//similer product

router.get('/related-product/:pid/:cid',relatedProductController);

//category wise product

router.get('/product-category/:slug',productCategoryController);

//payments routes
//token

router.get('/braintree/token',braintreeTokenController);

//payments
router.post('/braintree/payment',requiresignIN,braintreePaymentController)


export default router;
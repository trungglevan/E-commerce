import express from "express"; // step 1
import ProductController from "../app/controllers/ProductController.js";
const router = express.Router(); // step 2

router.put('/update/:id', ProductController.updateProduct);
router.post('/delete', ProductController.del); // localhost:3000/posts/delete
router.post('/store', ProductController.store); // localhost:3000/posts/store
router.get('/create', ProductController.create); // localhost:3000/posts/create
router.get('/:id', ProductController.detail); // localhost:3000/posts/101
router.get('/', ProductController.index); // localhost:3000/posts/

export default router;
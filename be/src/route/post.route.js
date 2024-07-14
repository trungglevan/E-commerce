import express from "express"; // step 1
import postController from "../app/controllers/PostController.js";  // step 3

const router = express.Router(); // step 2

router.put('/update/:id', postController.updatePost);
router.post('/delete', postController.del); // localhost:3000/posts/delete
router.post('/store', postController.store); // localhost:3000/posts/store
router.get('/create', postController.create); // localhost:3000/posts/create
router.get('/:id', postController.detail); // localhost:3000/posts/101
router.get('/', postController.index); // localhost:3000/posts/

export default router;
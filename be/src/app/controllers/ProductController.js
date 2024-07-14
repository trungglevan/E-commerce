import Product from "../models/Product.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class ProductController {

    // GET /posts
    index(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Product.findAll(db);
                // res.render('post/post', { posts: result });
                res.json(result);
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    // GET /posts/:id
    detail(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Product.findById(db, new ObjectId(req.params.id));
                // res.render('post/detail', { post: result });
                res.json(result);
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    // GET /posts/create
    create(req, res) {
        res.render('Product/create');
    }

    // POST /posts/store
    store(req, res) {
        console.log(req.body);
        connection.connect().then(async (db) => {
            try {
                const post = new Product(undefined, req.body.title, req.body.subtitle, req.body.content, req.body.image, req.body.author, req.body.publish_date, req.body.categories);
                const result = await post.save(db);
                // console.log(result);
                // res.redirect('/posts');
                res.json(result);
            } catch (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } finally {
                await connection.close();
            }
        });
    }

    updateProduct(req, res) {
        connection.connect().then(async (db) => {
            try {
                const post = new Product(undefined, req.body.title, req.body.subtitle, req.body.content, req.body.image, req.body.author, req.body.publish_date, req.body.categories);
                const result = await post.update(db, new ObjectId(req.params.id))
                console.log(result);
                // res.redirect('/posts');
                // if (!result) {
                //     return res.status(404).json({ message: "Không tìm thấy bài viết" });
                // }
                res.json(result);
            } catch (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } finally {
                await connection.close();
            }
        })
    }

    // POST /posts/delete
    del(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Product.del(db, new ObjectId(req.body._id));
                console.log(result);
                res.redirect('/Products');
            } catch (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } finally {
                await connection.close();
            }
        });
    }
}

export default new ProductController();
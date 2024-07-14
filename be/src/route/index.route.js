import authRouter from './auth.route.js';
import siteRouter from './site.route.js';
import postRouter from './post.route.js';
import productRoute from './product.route.js';

const route = (app) => {
    app.use('/auth', authRouter);
    app.use('/posts', postRouter);
    app.use('/products', productRoute);
    app.use('/', siteRouter);
}

export default route;

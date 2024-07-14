class Product {
    constructor(_id, name, description, original_price, current_price, quantity,
        price_unit, rating, rating_account, colors, size, size_unit,
        isInStock, isBestSeller
    ) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.original_price = original_price;
        this.current_price = current_price;
        this.quantity = quantity;
        this.price_unit = price_unit;
        this.rating = rating;
        this.rating_account = rating_account;
        this.colors = colors;
        this.size = size;
        this.size_unit = size_unit;
        this.isInStock = isInStock;
        this.isBestSeller = isBestSeller;
    }

    // insert a new Product
    async save(db) {
        try {
            const result = await db.collection('products').insertOne(
                this
            )
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // get all products
    static async findAll(db) {
        try {
            const docs = await db.collection('products').find({}).toArray();
            return docs.map(doc => new Product(doc._id, doc.name, doc.description, doc.original_price, doc.current_price, doc.quantity,
                doc.price_unit, doc.rating, doc.rating_account, doc.colors, doc.size, doc.size_unit,
                doc.isInStock, doc.isBestSeller));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // get a post based on id
    static async findById(db, id) {
        try {
            const doc = await db.collection('products').findOne({ _id: id });
            return doc;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // update a post based on id
    async update(db, id) {
        try {
            const result = await db.collection('products').updateOne(
                { _id: id },
                { $set: { title: this.title, subtitle: this.subtitle, content: this.content, image: this.image, author: this.author, publish_date: this.publish_date, categories: this.categories } }
            )
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }


    // delete a post based on id
    static async del(db, id) {
        try {
            const result = await db.collection('products').deleteOne({ _id: id });
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default Product;
class Post {
    constructor(_id, title, subtitle, content, image, author, publish_date, categories) {
        this._id = _id;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.image = image;
        this.author = author;
        this.publish_date = publish_date;
        this.categories = categories;
    }

    // insert a new post
    async save(db) {
        try {
            const result = await db.collection('posts').insertOne(
                this
            )
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // get all posts
    static async findAll(db) {
        try {
            const docs = await db.collection('posts').find({}).toArray();
            return docs.map(doc => new Post(doc._id, doc.title, doc.subtitle, doc.content, doc.image, doc.author, doc.publish_date, doc.categories));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // get a post based on id
    static async findById(db, id) {
        try {
            const doc = await db.collection('posts').findOne({ _id: id });
            return doc;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // update a post based on id
    async update(db, id) {
        try {
            const result = await db.collection('posts').updateOne(
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
            const result = await db.collection('posts').deleteOne({ _id: id });
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default Post;
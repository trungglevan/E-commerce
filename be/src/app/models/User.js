class User {
    constructor(_id, name, email, password, role) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // insert a new user
    async save(db) {
        try {
            return await db.collection('users').insertOne(this);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // check user exist
    static async isAvailable(db, email) {
        try {
            const result = await db.collection('users').findOne({ email: email });
            console.log(`Result0: ${result}`);
            return result ? true : false;
        } catch (err) {
            console.error(`Error: ${err}`);
            throw err;
        }
    }

    // get all users
    static async findAll(db) {
        try {
            const docs = await db.collection('users').find({}).toArray();
            return docs.map(doc => new User(doc._id, doc.name, doc.email, doc.password, doc.role));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // get a user based on id
    static async findById(db, id) {
        try {
            const doc = await db.collection('users').findOne({ _id: id });
            return doc;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // get user by email
    static async findByEmail(db, email) {
        try {
            const result = await db.collection('users').findOne({ email: email });
            return result ? new User(result._id, result.name, result.email, result.password, result.role) : null;
        } catch (err) {
            console.error(`Error: ${err}`);
            throw err;
        }
    }


}

export default User;

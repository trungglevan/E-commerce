import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://trungglevan:220204Trungg@trungg.tc24u73.mongodb.net/?retryWrites=true&w=majority&appName=trungg";

class Connection {
    constructor() {
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }

    async connect() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await this.client.connect();

            // Send a ping to confirm a successful connection
            // await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");

            return await this.client.db('asm');
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async close() {
        await this.client.close();
        console.log('Closed MongoDB connection');
    }
}

export default new Connection;

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xdpsuxi.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productsCollection = client.db('startingCore').collection('categories')

        const stokesProductsCollection = client.db('startingCore').collection('stocksProduct')
        const borrowedProductsCollection = client.db('startingCore').collection('borrowed')
        const returnProductsCollection = client.db('startingCore').collection('return')

        const soldProductsCollection = client.db('startingCore').collection('sold')
        const lendProductsCollection = client.db('startingCore').collection('lend')
        const returnBackProductsCollection = client.db('startingCore').collection('returnBack')

        const profitAccountsCollection = client.db('startingCore').collection('profitAccount')



        app.get('/categories', async (req, res) => {
            const query = {}
            const result = await productsCollection.find(query).toArray()
            res.send(result)
        })
        // ============================= STOCKS IN ============================================================//

        // -------------------------- cash stocks----------------------
        app.get('/stocksProduct', async (req, res) => {
            const query = {}
            const result = await stokesProductsCollection.find(query).toArray()
            res.send(result)
        })

        app.delete('/stocksProduct/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await stokesProductsCollection.deleteOne(query);
            res.send(result)
        })

        app.post('/stocksProduct', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await stokesProductsCollection.insertOne(item)
            res.send(result)
        })

        app.get('/stocksProduct/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            console.log(query)
            const result = await stokesProductsCollection.find(query).toArray();
            res.send(result);

        })
        //  ------------------borrowed---------------------------------------------//

        app.get('/borrowed', async (req, res) => {
            const query = {}
            const result = await borrowedProductsCollection.find(query).toArray()
            res.send(result)
        })
        app.post('/borrowed', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await borrowedProductsCollection.insertOne(item)
            res.send(result)
        })

        app.get('/borrowed/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            console.log(query)
            const result = await borrowedProductsCollection.find(query).toArray();
            res.send(result);

        })
        app.delete('/borrowed/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await borrowedProductsCollection.deleteOne(query);
            res.send(result)
        })
        // ---------------------------return--------------------------------------------//
        app.get('/return', async (req, res) => {
            const query = {}
            const result = await returnProductsCollection.find(query).toArray()
            res.send(result)
        })
        app.post('/return', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await returnProductsCollection.insertOne(item)
            res.send(result)
        })

        app.get('/return/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            console.log(query)
            const result = await returnProductsCollection.find(query).toArray();
            res.send(result);

        })

        app.delete('/return/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await returnProductsCollection.deleteOne(query);
            res.send(result)
        })


        // ================================STOCKS OUT ==============================================//

        // ------------------------------sold-------------------------------//
        app.get('/sold', async (req, res) => {
            const query = {}
            const result = await soldProductsCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/sold/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            console.log(query)
            const result = await soldProductsCollection.find(query).toArray();
            res.send(result);

        })
        app.post('/sold', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await soldProductsCollection.insertOne(item)
            res.send(result)
        })
        app.delete('/sold/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await soldProductsCollection.deleteOne(query);
            res.send(result)
        })

        // -------------------------------lend --------------------------------------------------------//
        app.get('/lend', async (req, res) => {
            const query = {}
            const result = await lendProductsCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/lend/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            console.log(query)
            const result = await lendProductsCollection.find(query).toArray();
            res.send(result);

        })
        app.post('/lend', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await lendProductsCollection.insertOne(item)
            res.send(result)
        })
        app.delete('/lend/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await lendProductsCollection.deleteOne(query);
            res.send(result)
        })
        // --------------------------------------Return back --------------------------//

        app.get('/returnBack', async (req, res) => {
            const query = {}
            const result = await returnBackProductsCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/returnBack/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            console.log(query)
            const result = await returnBackProductsCollection.find(query).toArray();
            res.send(result);

        })
        app.post('/returnBack', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await returnBackProductsCollection.insertOne(item)
            res.send(result)
        })
        app.delete('/returnBack/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await returnBackProductsCollection.deleteOne(query);
            res.send(result)
        })

        // ----------------------------------profit account ------------------------------------//

        app.get('/profitAccount', async (req, res) => {
            const query = {}
            const result = await profitAccountsCollection.find(query).toArray()
            res.send(result)
        })
        app.post('/profitAccount', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await profitAccountsCollection.insertOne(item)
            res.send(result)
        })

        app.get('/profitAccount/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log(query)
            const result = await profitAccountsCollection.find(query).toArray();
            res.send(result);

        })
        
        app.delete('/profitAccount/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await profitAccountsCollection.deleteOne(query);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send('product is running on ')
})

app.listen(port, () => {
    console.log(`my products is running on ${port}`)
})
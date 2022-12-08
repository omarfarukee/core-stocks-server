require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
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

        app.get('/categories', async (req, res) => {
            const query = {}
            const result = await productsCollection.find(query).toArray()
            res.send(result)
        })
        // -------------------------- cash stocks----------------------
        app.get('/stocksProduct', async (req, res) => {
            const query = {}
            const result = await stokesProductsCollection.find(query).toArray()
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
        //  ------------------borrowed------------------------------------

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
        // ---------------------------return--------------------------------------------
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
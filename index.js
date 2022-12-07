require('dotenv').config()
const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json()) 

async function run() {

    try{

    }
    finally{

    }
}
run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send('product is running on ')
})

app.listen(port, () => {
    console.log(`my products is running on ${port}`)
})
const express = require('express');
const mongoose = require('mongoose');

const { graphqlHTTP } = require('express-graphql');
// const schema = require('./schema/schema');
require('dotenv').config();
const cors = require('cors')


const app = express();
app.use(cors())

// app.use('/graphql', graphqlHTTP({
    //     schema,
    //     graphiql: true
    // }))
    
    
mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    console.log('Connected to database')
    app.listen(4000, () => { console.log('app is live on port 4000') })    
}) 

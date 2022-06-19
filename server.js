const express = require('express');
const mongoose = require('mongoose');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index');
require('dotenv').config();
const cors = require('cors')


const app = express();
app.use(cors())



app.listen(4000, () => { console.log('app is live on port 4000') })    


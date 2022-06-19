const express = require('express');
require('dotenv').config();
const routes = require('./routes')
const protectedRoutes = require('./routes/protected')



const cors = require('cors')

const app = express();


app.use('/', routes);
app.use('/protected', protectedRoutes)

app.use(cors())



app.listen(4000, () => { console.log('app is live on port 4000') })    


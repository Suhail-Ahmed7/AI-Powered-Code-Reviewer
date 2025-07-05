const express = require('express')
require('dotenv').config();
require('./config/dbConnection')()
const cors = require('cors')
const aiRoutes = require('./routes/aiRoutes')
const app = express()
app.use(express.json())

app.use(cors())

app.use('/ai', aiRoutes)
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server running on port, ${PORT}`,);

})
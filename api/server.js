const express   = require("express")
const app       = express()
const cors      = require("cors")
const dotenv    = require("dotenv")
const mongoose  = require("mongoose")
const router    = require('./router/router');

dotenv.config()
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database connected successfully');
    app.listen(process.env.PORT,() => {
        console.log(`Server connected successfully this port ${process.env.PORT}`);
    })
})

app.use('/api/v1/',router)
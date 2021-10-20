const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;

// Initializing the base directory
global.__basedir = path.join(__dirname, '../');

app.use(cors());

// express body parser
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use(require('./routers'));

app.use((err, req, res, next) => {
    if(err){
        const statusCode = err.statusCode? err.statusCode: 401;
        const message = err.message? err.message: 'terjadi error di server';

        res.status(statusCode).json({message: message});
    }
});

app.listen(PORT, () => {
    console.log(`app listen at port ${PORT}`);
});
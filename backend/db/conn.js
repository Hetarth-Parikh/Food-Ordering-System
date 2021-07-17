const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connection is successful')
}).catch(() => {
    console.log('Connection is not successful')
});

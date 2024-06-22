const express = require('express');
const app = express();
const routerApi = require('./routes/router');
const {logError, errorHandler, boomErrorHandler}= require('./middleware/error.handler')
const port = 3000;

app.use(express.json());

app.listen(port,()=>{
    console.log("Puerto " + port)
});

routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);
const express = require('express');
const errorHandler = require('./middleware/error.middleware');
const app = express();
const port = 3000;
app.use(express.json());

app.use('/tickets', require('./routes/tickets.routes'));

app.use(errorHandler);
app.listen(port, () => {  console.log(`Example app listening at http://localhost:${port}`);});
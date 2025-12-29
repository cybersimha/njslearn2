const express = require('express');
const errorHandler = require('./middleware/error.middleware');
const app = express();
const port = 3000;
const otpRoutes = require('./routes/otp.routes');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');

app.use(express.json());

app.use('/tickets', require('./routes/tickets.routes'));
app.use('/otp', otpRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);


app.use(errorHandler);
app.listen(port, () => {  console.log(`Example app listening at http://localhost:${port}`);});
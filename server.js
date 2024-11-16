const express = require('express');
const sequelize = require('./config'); 

const schoolRoutes = require('./routes/staff/staffRoute'); 
const accountRouter = require('./routes/account/accountRoutes'); 
const notificationRouter = require('./routes/core/notificationRouter'); 
const app = express();

app.use(express.json());

app.use('/staff', schoolRoutes);
app.use('/account', accountRouter);
app.use("/notification",notificationRouter)


sequelize.authenticate()
    .then(async () => {
        console.log('Database connected...');
        
        return await sequelize.sync(); ; 
    })
    .then(() => {console.log('Database synchronized')
        require('./association'); 

    })
    .catch(err => console.log('Error: ' + err));

app.get('/', (req, res) => {
    res.send('Welcome to the School Management API');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Set server to listen on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const config = require("./config/config.js");
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db.js");
const userRoutes = require('./routes/userRoutes.js');
const errorHandler = require("./middleware/errorMiddleware.js");

const app = express();

app.use(cors())
app.use(express.json());

// Sync the database
sequelize.sync({ alter: false })
    .then(() => {
        console.log(`MySQL Database Connected Successfully in ${config.NODE_ENV} mode`);
    })
    .catch(error => {
        console.error("Error connecting to MySQL database:", error);
    });


//models
require("./models/user.js")

//routes
app.use('/user', userRoutes);

app.use(errorHandler);

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
    console.log(`APP LISTENING ON PORT ${PORT} in ${config.NODE_ENV} mode`);
});

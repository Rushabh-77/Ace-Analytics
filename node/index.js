const config = require("./config/config.js");
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db.js");
const userRoutes = require('./routes/userRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const errorHandler = require("./middleware/errorMiddleware.js");
const { protect } = require("./middleware/authMiddleware.js")

const app = express();

app.use(cors())
app.use(express.json());

// Sync the database
sequelize.sync({ alter: true })
    .then(() => {
        console.log(`MySQL Database Connected Successfully in ${config.NODE_ENV} mode`);
    })
    .catch(error => {
        console.error("Error connecting to MySQL database:", error);
    });


app.use("/api", protect, (req, res, next) => {
    next()
})

//model
require("./models/User.js")
require("./models/Book.js")
require("./models/Cart.js")
require("./models/Order.js")
require("./models/OrderItem.js")

//routes
app.use('/user', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);


app.use(errorHandler);

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
    console.log(`APP LISTENING ON PORT ${PORT} in ${config.NODE_ENV} mode`);
});

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
connectDB();
// Import routes

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

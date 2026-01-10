import express from "express";
const app = express();
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errors.js"
import { connectDatabase } from "./config/dbConnect.js";

process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err}`);
    console.log ("Shutting down due to uncaught exception");
    process.exit(1);
});

dotenv.config({ path:"backend/config/config.env"});


connectDatabase();

app.use(express.json());
app.use(cookieParser());


import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";


app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    );
});

process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err}`);
    console.log ("Shutting down server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});

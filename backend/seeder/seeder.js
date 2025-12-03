import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/projekat");
    console.log("Connected to MongoDB");

    await Product.deleteMany();
    console.log("All products deleted");

    const inserted = await Product.insertMany(products);
    console.log(` ${inserted.length} products added`);

    inserted.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} (${p.category})`);
    });

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
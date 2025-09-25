import express from "express";
import cors from "cors";
import all_product from "./allproduct/allproduct.js"; // 👈 correct path

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// ✅ Route 1: Get all products
app.get("/api/products", (req, res) => {
  res.json(all_product);
});

// ✅ Route 2: Get product by ID
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = all_product.find((p) => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// ✅ Route 3: Get products by category
app.get("/api/category/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const filtered = all_product.filter(
    (p) => p.category.toLowerCase() === category
  );
  res.json(filtered);
});

// ✅ Route 4: Search products by name
app.get("/api/search/:query", (req, res) => {
  const query = req.params.query.toLowerCase();
  const filtered = all_product.filter((p) =>
    p.name.toLowerCase().includes(query)
  );
  res.json(filtered);
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

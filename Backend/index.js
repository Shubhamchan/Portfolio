import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Form from "./Database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));


app.get("/",(req,res)=>{
   return res.send("Backend is running");
});


app.post("/submit", async (req, res) => {
  const { email, fullName, phone, subject, message } = req.body;

  if (!email || !fullName || !phone || !subject || !message) {
    return res.status(400).json({
      response: false,
      message: "All fields are required",
    });
  }

  try {
    const newForm = new Form({ email, fullName, phone, subject, message });
    await newForm.save();
    res.status(200).json({
      response: true,
      message: "Form submitted successfully!",
    });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({
      response: false,
      message: "Server error",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at Port:${PORT}`);
});

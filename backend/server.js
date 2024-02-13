// server.js
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("file_input");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.post("/submitForm", (req, res) => {
  // Use multer middleware to handle file upload
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(500).json({ success: false, error: "File upload error" });
    } else if (err) {
      console.error("Error:", err);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }

    try {
      const {
        name,
        email,
        parentsFullName,
        mobileNumber,
        message,
        grade,
        previousSchool,
        dob,
      } = req.body;

      const filename = req.file ? req.file.filename : null;

      const connection = await pool.getConnection();
      const [result] = await connection.query(
        "INSERT INTO AdmissionForm1 (name, email, parentsFullName, mobileNumber, message, grade, filename, previousSchool, dob) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [name, email, parentsFullName, mobileNumber, message, grade, filename, previousSchool, dob]
      );

      connection.release();
      res.json({ success: true, insertedId: result.insertId });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const connection = await pool.getConnection();
    const [results] = await connection.query(
      "SELECT * FROM Users WHERE email = ? AND password = SHA2(CONCAT(?, salt), 256)",
      [email, password]
    );

    connection.release();

    if (results.length > 0) {
      res.json({ success: true, message: "Authentication successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


app.get("/testDBConnection", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ success: true, message: "Database connection successful" });
  } catch (error) {
    console.error("Error testing database connection:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Database connection error" });
  }
});

app.get("/fetchFormData", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query("SELECT * FROM AdmissionForm1");
    connection.release();

    res.json({ success: true, formDataList: results });
  } catch (error) {
    console.error("Error fetching form data:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.delete("/deleteFormData/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    await connection.query("DELETE FROM AdmissionForm1 WHERE id = ?", [id]);
    connection.release();
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting form data:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

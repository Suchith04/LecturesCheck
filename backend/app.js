const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = "mongodb+srv://suchith:Suchi2004@cluster0.3tlr4ax.mongodb.net/";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

// Define storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize upload middleware
const upload = multer({ storage: storage });

// Define Mongoose schema and model
const pdfSchema = new mongoose.Schema({
  pdfTitle: String,
  pdfFilePath: String,
  videoTitle: String,
  videoFilePath: String,
}, { timestamps: true });

const PdfDetails = mongoose.model("PdfDetails", pdfSchema);

// File upload endpoint
app.post('/upload-files', upload.fields([{ name: 'pdfFile' }, { name: 'videoFile' }]), async (req, res) => {
  try {
    const { pdfTitle, videoTitle } = req.body;
    const pdfFile = req.files['pdfFile'][0];
    const videoFile = req.files['videoFile'][0];

    // Create document in MongoDB
    const newFile = new PdfDetails({
      pdfTitle,
      pdfFilePath: pdfFile.path,
      videoTitle,
      videoFilePath: videoFile.path,
    });

    await newFile.save();

    // Call Python script using spawn
    const pythonScript = "python2.py"; // Replace with your Python script name
    const pythonProcess = spawn('python', [pythonScript, pdfFile.path, videoFile.path]);

    let pythonOutput = "";

    // Capture Python script output
    pythonProcess.stdout.on('data', (data) => {
      pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      if (code === 0) {
        
        res.send({ status: "ok", data: newFile, pythonOutput });
      } else {
        res.status(500).json({ status: "error", message: "Python script failed" });
      }
    });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Test endpoint
app.get("/", (req, res) => {
  res.send("Success!!");
});

// Start the server
app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});

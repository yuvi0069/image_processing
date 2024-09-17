const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const cors=require('cors');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Temp folder for saving files
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Image upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, buffer } = req.file;
  const ext = path.extname(originalname).toLowerCase();
  const fileName = `${Date.now()}-${originalname}`;
  const tempPath = path.join(tempDir, fileName);

  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return res.status(400).json({ error: 'Only PNG and JPEG images are allowed' });
  }

  // Save the original image to the temp directory
  fs.writeFileSync(tempPath, buffer);
  res.json({ fileName, tempPath });
});

// Image processing endpoint (for real-time previews)
app.post('/process', upload.single('image'), async (req, res) => {
  const { fileName, brightness, contrast, rotate } = req.body;
  const filePath = path.join(tempDir, fileName);

  try {
    let image = sharp(filePath);

    // Apply brightness and contrast adjustments if provided
    if (brightness) image = image.modulate({ brightness: parseFloat(brightness) });
    if (contrast) image = image.linear(parseFloat(contrast), 0);

    // Apply rotation if provided
    if (rotate) image = image.rotate(parseFloat(rotate));

    // Resize for lower quality previews
    if (crop) {
      const { x, y, width, height } = JSON.parse(crop);
      image = image.extract({ left: Math.round(x), top: Math.round(y), width: Math.round(width), height: Math.round(height) });
    }

    const previewBuffer = await image.resize({ width: 500 }).toBuffer();

    res.contentType('image/jpeg').send(previewBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Image processing failed', details: error.message });
  }
});

// Final image processing for download
app.post('/download', async (req, res) => {
  const { fileName, format } = req.body;
  const filePath = path.join(tempDir, fileName);
  const outputFormat = format === 'jpeg' ? 'jpeg' : 'png';

  try {
    const processedImagePath = `${tempDir}/processed-${fileName}.${outputFormat}`;
    
    await sharp(filePath)
      .toFormat(outputFormat)
      .toFile(processedImagePath);

    res.download(processedImagePath);
  } catch (error) {
    res.status(500).json({ error: 'Final image download failed', details: error.message });
  }
});

// Clean up temp files periodically (optional)
setInterval(() => {
  const files = fs.readdirSync(tempDir);
  files.forEach(file => {
    const filePath = path.join(tempDir, file);
    const stats = fs.statSync(filePath);
    const oneHour = 60 * 60 * 1000;
    if (Date.now() - stats.mtimeMs > oneHour) {
      fs.unlinkSync(filePath);
    }
  });
}, 60 * 60 * 1000);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

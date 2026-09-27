# AI Road Damage Detection System

A web application that uses AI to detect and classify road damage from uploaded images.

## Features

- **Image Upload**: Drag and drop or select road images for analysis
- **Damage Classification**: Classifies damage into 5 categories:
  - No Damage
  - Crack (Longitudinal)
  - Crack (Transverse)
  - Pothole
  - Alligator Crack
- **Confidence Scores**: Displays prediction confidence and probability distribution
- **Modern UI**: Clean, responsive interface with smooth animations

## Tech Stack

- **Backend**: Python/Flask
- **Frontend**: HTML/CSS/JavaScript
- **AI/ML**: TensorFlow (with CNN model)
- **Image Processing**: Pillow (PIL)

## Installation

1. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the Flask Server**:
   ```bash
   python app.py
   ```

3. **Open the Web Application**:
   - Navigate to `http://localhost:5000` in your web browser

## Usage

1. Open the web application in your browser at `http://localhost:5000`
2. Upload a road image by:
   - Clicking "Select Image" button
   - Dragging and dropping an image onto the upload area
3. Click "Analyze Damage" to process the image
4. View the detection results with damage type and confidence scores

## API Endpoints

- `GET /` - Main application page
- `GET /health` - Health check endpoint
- `POST /predict` - Upload image for damage detection
  - Body: `image` (file)
  - Returns: JSON with damage type, confidence, and probability distribution

## Project Structure

```
AI Road Damage Detection System/
├── app.py              # Flask backend server
├── index.html          # Frontend HTML
├── styles.css          # Frontend styling
├── script.js           # Frontend JavaScript
├── requirements.txt    # Python dependencies
├── start.bat          # Quick start script (Windows)
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Notes

- The current implementation uses a CNN model for demonstration
- For production use, train a custom model on a road damage dataset
- The server runs on `http://localhost:5000` by default
- CORS is enabled to allow frontend-backend communication

## Future Enhancements

- Integrate a custom-trained model specifically for road damage
- Add real-time camera support
- Implement batch image processing
- Add historical results dashboard
- Include additional damage classification categories

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
- **AI/ML**: TensorFlow (with pre-trained MobileNetV2 model)
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
   - Open `index.html` in your web browser
   - Or serve it with a local server (recommended)

## Usage

1. Open the web application in your browser
2. Upload a road image by:
   - Clicking "Select Image" button
   - Dragging and dropping an image onto the upload area
3. Click "Analyze Damage" to process the image
4. View the detection results with damage type and confidence scores

## API Endpoints

- `GET /` - API information
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
└── README.md          # This file
```

## Notes

- The current implementation uses a pre-trained MobileNetV2 model as a placeholder
- For production use, train a custom model on a road damage dataset
- The server runs on `http://localhost:5000` by default
- CORS is enabled to allow frontend-backend communication

## Future Enhancements

- Integrate a custom-trained model specifically for road damage
- Add real-time camera support
- Implement batch image processing
- Add historical results dashboard
- Include additional damage classification categories

const API_URL = '/predict';

// Check if server is running
async function checkServerHealth() {
    try {
        const response = await fetch('/health');
        const data = await response.json();
        return data.status === 'healthy';
    } catch (error) {
        console.error('Server health check failed:', error);
        return false;
    }
}

const DAMAGE_CLASSES = [
    "No Damage",
    "Crack (Longitudinal)",
    "Crack (Transverse)",
    "Pothole",
    "Alligator Crack"
];

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const selectBtn = document.getElementById('selectBtn');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const clearBtn = document.getElementById('clearBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const loading = document.getElementById('loading');
const damageType = document.getElementById('damageType');
const confidence = document.getElementById('confidence');
const probabilityBars = document.getElementById('probabilityBars');

// Event Listeners
selectBtn.addEventListener('click', () => imageInput.click());
uploadArea.addEventListener('click', (e) => {
    if (e.target !== selectBtn) imageInput.click();
});

imageInput.addEventListener('change', handleImageSelect);
clearBtn.addEventListener('click', clearImage);
analyzeBtn.addEventListener('click', analyzeImage);

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        handleImageFile(files[0]);
    }
});

function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleImageFile(file);
    }
}

function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        uploadArea.style.display = 'none';
        previewSection.style.display = 'block';
        resultsSection.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function clearImage() {
    imageInput.value = '';
    previewImage.src = '';
    uploadArea.style.display = 'block';
    previewSection.style.display = 'none';
    resultsSection.style.display = 'none';
}

async function analyzeImage() {
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image first');
        return;
    }

    // Check if server is running
    const serverRunning = await checkServerHealth();
    if (!serverRunning) {
        alert('Server is not running. Please start the Flask server by running: python app.py');
        return;
    }

    // Show loading
    loading.style.display = 'block';
    analyzeBtn.disabled = true;
    resultsSection.style.display = 'none';

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            displayResults(data.result);
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to analyze image. Please make sure the server is running.');
    } finally {
        loading.style.display = 'none';
        analyzeBtn.disabled = false;
    }
}

function displayResults(result) {
    damageType.textContent = result.damage_type;
    confidence.textContent = (result.confidence * 100).toFixed(2) + '%';
    
    // Display probability bars
    probabilityBars.innerHTML = '';
    result.all_probabilities.forEach((prob, index) => {
        const bar = document.createElement('div');
        bar.className = 'probability-bar';
        bar.innerHTML = `
            <div class="probability-bar-label">
                <span>${DAMAGE_CLASSES[index]}</span>
                <span>${(prob * 100).toFixed(2)}%</span>
            </div>
            <div class="probability-bar-track">
                <div class="probability-bar-fill" style="width: ${prob * 100}%"></div>
            </div>
        `;
        probabilityBars.appendChild(bar);
    });

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

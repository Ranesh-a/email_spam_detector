# AI Spam Detector Web App

A modern, interactive web application that uses Machine Learning to accurately detect whether an email is **Spam** or **Ham** (genuine).

## ✨ Features
- **Machine Learning Core:** Uses Logistic Regression trained on TF-IDF vectorization for high-accuracy text classification.
- **Flask REST API:** A lightweight Python backend that quickly processes inference requests.
- **Modern Glassmorphism UI:** A stunning, fully responsive frontend with premium gradient buttons, backdrop filters, and smooth CSS micro-animations.

## ⚙️ Prerequisites
- Python 3.x
- `pip` package manager

## 🚀 Installation & Setup

1. **Activate your Virtual Environment** (if you have one):
   ```bash
   .\venv\Scripts\activate
   ```

2. **Install the required dependencies**:
   ```bash
   pip install pandas numpy scikit-learn flask joblib
   ```

3. **Train the Model & Export Artifacts**:
   Before running the web app, you must generate the pre-trained model files natively on your system.
   ```bash
   python spam_detector.py
   ```
   *(This will save `spam_model.pkl` and `vectorizer.pkl` into the folder)*

## 🖥️ Running the Application

1. Start the Flask development server:
   ```bash
   python app.py
   ```
2. Open your web browser and navigate to: **[http://localhost:5000](http://localhost:5000)**
3. Paste any email content into the text area to see the AI classification in action!

## 📁 Project Structure
- `spam_detector.py`: Model training logic and payload export.
- `app.py`: The Flask server that serves the webpage and `/predict` endpoint.
- `mail_data.csv`: The dataset used to originally train the ML model.
- `templates/index.html`: The markup for the beautiful web interface.
- `static/style.css`: The Vanilla CSS for the glassmorphism design.
- `static/script.js`: The frontend script managing asynchronous API calls.

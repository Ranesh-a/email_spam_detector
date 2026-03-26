from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

# Load the pre-trained model and vectorizer
try:
    model = joblib.load('spam_model.pkl')
    vectorizer = joblib.load('vectorizer.pkl')
except Exception as e:
    print(f"Error loading models. Please run spam_detector.py first. Error: {e}")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    email_text = data.get('email', '')
    
    if not email_text:
        return jsonify({'error': 'No email text provided'}), 400
        
    try:
        # Transform the input text
        input_features = vectorizer.transform([email_text])
        
        # Make a prediction
        prediction = model.predict(input_features)
        
        # Determine the result (0 = spam, 1 = ham)
        result = 'spam' if prediction[0] == 0 else 'ham'
        
        return jsonify({
            'success': True,
            'prediction': result
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

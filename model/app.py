# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# import json

# app = Flask(__name__)
# CORS(app)

# # Load the pre-trained model
# model = load_model('3.h5')

# # Load the tokenizer
# with open('tokenizer_updated.json', 'r', encoding='utf-8') as f:
#     tokenizer_json = json.load(f)
#     tokenizer = tf.keras.preprocessing.text.tokenizer_from_json(tokenizer_json)

# # Define the maximum sequence length (same as used during training)
# max_sequence_length =10 # Enter the max_sequence_length used during training

# # Define the label columns
# label_columns = ["racial_hate", "Religious_caste_hate", "sexual_orientation_hate", "gender_based_hate",
#                  "disability_hate", "political_hate", "social_caste_hate", "age_based_hate",
#                  "nationality_hate", "appearance_based_hate", "none"]

# @app.route('/')
# def hello():
#     return 'Hello, World!'

# # Add route for prediction
# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.json  # Assuming JSON data is sent from the frontend
#     texts = data['texts']  # Assuming the key for text data is 'texts'

#     # Tokenize and pad sequences
#     sequences = tokenizer.texts_to_sequences(texts)
#     padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length)

#     # Make predictions
#     predictions = model.predict(padded_sequences)

#     # Format predictions
#     results = {label: prediction.tolist() for label, prediction in zip(label_columns, predictions.T)}

#     return jsonify(results)

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json
import json
import os

app = Flask(__name__)
CORS(app)

# Load tokenizer
tokenizer_path = os.path.join(os.path.dirname(__file__), 'tokenizer_updated.json')
with open(tokenizer_path, 'r', encoding='utf-8') as f:
    tokenizer_config = json.load(f)
tokenizer = tokenizer_from_json(tokenizer_config)

# Load your model
model_path = "3.h5"

try:
    model = load_model(model_path)
    print("Model loaded successfully.")
    print(model.summary())  # Print model summary
except Exception as e:
    print("Error loading the model:", str(e))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_text = request.json['text']
        print('Received input text:', input_text)

        # Preprocess input text
        sequences = tokenizer.texts_to_sequences([input_text])
        padded_sequences = pad_sequences(sequences, maxlen=127, padding='post', truncating='post')

        # Make predictions
        predictions = model.predict(padded_sequences)

        return jsonify({'success': True, 'predictions': predictions.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

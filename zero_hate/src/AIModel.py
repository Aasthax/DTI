import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import model_from_json
import json

# Load dataset
dataset = pd.read_excel('your_dataset.xlsx')

# Preprocessing steps...
text_column = 'Text'
label_columns = ["racial_hate", "Religious_caste_hate", "sexual_orientation_hate", "gender_based_hate",
                 "disability_hate", "political_hate", "social_caste_hate", "age_based_hate",
                 "nationality_hate", "appearance_based_hate", "none"]

dataset = dataset.dropna(subset=[text_column])

train_texts, test_texts, train_labels, test_labels = train_test_split(
    dataset[text_column], dataset[label_columns], test_size=0.2, random_state=42)

tokenizer = Tokenizer(num_words=10000)
tokenizer.fit_on_texts(train_texts)
train_sequences = tokenizer.texts_to_sequences(train_texts)
test_sequences = tokenizer.texts_to_sequences(test_texts)

max_sequence_length = max(max([len(sequence) for sequence in train_sequences]), max([len(sequence) for sequence in test_sequences]))
train_data = pad_sequences(train_sequences, maxlen=max_sequence_length)
test_data = pad_sequences(test_sequences, maxlen=max_sequence_length)

model = Sequential()
model.add(Embedding(10000, 100, input_length=max_sequence_length))
model.add(LSTM(100, dropout=0.2, recurrent_dropout=0.2))
model.add(Dense(len(label_columns), activation='softmax'))

model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

model.fit(train_data, train_labels, validation_data=(test_data, test_labels), epochs=10, batch_size=32)

model.save('hate_speech_classification_model_updated.h5')

tokenizer_json = tokenizer.to_json()
with open('tokenizer_updated.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(tokenizer_json, ensure_ascii=False))

test_loss, test_accuracy = model.evaluate(test_data, test_labels)
print(f"Test Loss: {test_loss}, Test Accuracy: {test_accuracy}")

def make_predictions(text):
    # Load tokenizer
    with open('tokenizer_updated.json', 'r', encoding='utf-8') as f:
        tokenizer_json = json.load(f)
    tokenizer = tokenizer_from_json(tokenizer_json)

    # Preprocess text
    encoded_text = pad_sequences(tokenizer.texts_to_sequences([text]), maxlen=max_sequence_length)

    # Load model
    model = load_model('hate_speech_classification_model_updated.h5')

    # Make predictions
    predictions = model.predict(encoded_text)

    # Postprocessing steps...
    threshold = 0.5
    labels = (predictions > threshold).astype(int)
    predicted_labels = [label_columns[i] for i, label in enumerate(labels[0]) if label == 1]
    return predicted_labels

new_text = "hat"
predicted_labels = make_predictions(new_text)
print(f"Predicted Labels for '{new_text}': {predicted_labels}")

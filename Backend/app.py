from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

with open('models.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

exercise_model = model['model_1']
diet_model = model['model_2']

@app.route('/')
def home():
    return "Welcome to the Diet and Exercise Prediction API"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print(diet_model)
    print(exercise_model)

    redefined_data = [[data['sex'], data['age'], data['height'], data['weight'], data['hypertension'], data['diabetes']]]

    prediction_exercise = int(exercise_model.predict(redefined_data))
    prediction_diet = int(diet_model.predict(redefined_data))
    print(prediction_exercise)
    print(prediction_diet)
    return jsonify({'exercise': prediction_exercise, 'diet': prediction_diet})

if __name__ == '__main__':
    app.run(debug=True, port=5000)  
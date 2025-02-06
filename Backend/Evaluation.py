from flask import Flask, request, jsonify
import pandas as pd
from sklearn.metrics import accuracy_score, f1_score, mean_squared_error, confusion_matrix

app = Flask(_name_)

# Function to calculate performance metrics
def calculate_metrics(df):
    # Define true labels and predicted labels for FSSAI rating
    y_true_fssai = df['true_fssai_rating']
    y_pred_fssai = df['predicted_fssai_rating']

    # Define true labels and predicted labels for Eco score
    y_true_eco = df['true_eco_score']
    y_pred_eco = df['predicted_eco_score']

    # Accuracy: Percentage of correct predictions (for categorical data)
    accuracy_fssai = accuracy_score(y_true_fssai, y_pred_fssai)
    accuracy_eco = accuracy_score(y_true_eco, y_pred_eco)

    # F1-Score: Harmonic mean of precision and recall (for imbalanced classes)
    f1_fssai = f1_score(y_true_fssai, y_pred_fssai, average='weighted')
    f1_eco = f1_score(y_true_eco, y_pred_eco, average='weighted')

    # Mean Squared Error (MSE): Measures the average of the squares of errors (for regression problems)
    mse_fssai = mean_squared_error(y_true_fssai, y_pred_fssai)
    mse_eco = mean_squared_error(y_true_eco, y_pred_eco)

    # Confusion Matrix: Shows the counts of true positives, false positives, false negatives, and true negatives
    conf_matrix_fssai = confusion_matrix(y_true_fssai, y_pred_fssai)
    conf_matrix_eco = confusion_matrix(y_true_eco, y_pred_eco)

    # Error Rate: Fraction of misclassified samples
    error_rate_fssai = 1 - accuracy_fssai
    error_rate_eco = 1 - accuracy_eco

    return {
        "FSSAI Accuracy": accuracy_fssai * 100,
        "Eco Score Accuracy": accuracy_eco * 100,
        "FSSAI F1-Score": f1_fssai,
        "Eco Score F1-Score": f1_eco,
        "FSSAI MSE": mse_fssai,
        "Eco Score MSE": mse_eco,
        "FSSAI Confusion Matrix": conf_matrix_fssai.tolist(),
        "Eco Score Confusion Matrix": conf_matrix_eco.tolist(),
        "FSSAI Error Rate": error_rate_fssai,
        "Eco Score Error Rate": error_rate_eco
    }

# Function to load data from CSV (or any other file)
def load_data():
    # Assuming the CSV file is located in the same directory
    df = pd.read_csv('fssai_eco_scores.csv')
    return df

# Endpoint to receive dynamic data (JSON) or load default dataset if no data is provided
@app.route('/metrics', methods=['POST'])
def metrics():
    data = request.get_json()
    
    # If no data is sent via POST, load default dataset
    if not data:
        df = load_data()
    else:
        # Otherwise, convert the incoming JSON data into a DataFrame
        df = pd.DataFrame(data)

    # Calculate metrics
    result = calculate_metrics(df)
    
    return jsonify(result)

if _name_ == '_main_':
    app.run(debug=True)
import pandas as pd
import requests
import hashlib
import numpy as np
from qiskit import QuantumCircuit, Aer, execute
from qiskit.circuit.library import ZZFeatureMap
import os
from flask import Flask, request, jsonify
from google.cloud import aiplatform

# ✅ Vertex AI Configuration
PROJECT_ID = "your-gcp-project-id"
REGION = "us-central1"
MODEL_ID = "your-model-id"
DATASET_PATH = "food_dataset.csv"

app = Flask(_name_)

# Load datasets from CSV files
nutrition_df = pd.read_csv("datasets/nutrition_data.csv")
ingredients_df = pd.read_csv("datasets/ingredients_data.csv")
allergen_df = pd.read_csv("datasets/allergen_data.csv")
sustainability_df = pd.read_csv("datasets/sustainability_data.csv")
alternatives_df = pd.read_csv("datasets/alternative_products.csv")

# Function to fetch product details from Open Food Facts API
def fetch_product_details(barcode):
    api_url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
    response = requests.get(api_url)
    product_data = response.json()
    
    if "product" in product_data:
        return product_data["product"]
    else:
        return None

# Function to compute AI Health Score
def calculate_health_score(product):
    nutrient_score = (
        -10 * product.get("sugar_100g", 0)
        - 8 * product.get("saturated-fat_100g", 0)
        - 7 * product.get("sodium_100g", 0)
        + 8 * product.get("proteins_100g", 0)
        + 10 * product.get("fiber_100g", 0)
        + 5 * (1 - product.get("sugar_100g", 0))  # Reward low sugar
    )
    
    # Normalize to 0-100 scale
    return max(0, min(100, nutrient_score))

# Function to compute AI Ingredient Score
def calculate_ingredient_score(product):
    ingredients = product.get("ingredients_text", "").split(", ")
    total_score = 0
    
    for ingredient in ingredients:
        if ingredient in ingredients_df["beneficial"].values:
            total_score += 2
        elif ingredient in ingredients_df["harmful"].values:
            total_score -= 3
    
    return max(0, min(100, total_score / len(ingredients) * 10)) if ingredients else 0

# Function to check allergens
def check_allergens(product, user_allergies):
    allergens = []
    for allergy in user_allergies:
        if allergy.lower() in product.get("ingredients_text", "").lower():
            allergens.append(allergy)
    
    return ", ".join(allergens) if allergens else "No allergens detected"

# Function to compute Sustainability Score
def calculate_sustainability_score(product):
    packaging_score = 10 if "biodegradable" in product.get("packaging", "").lower() else -10
    production_score = 10 if "organic" in product.get("labels", "").lower() else -5
    
    return max(0, min(100, packaging_score + production_score))

# Function to recommend alternative products
def find_alternative_products(product):
    category = product.get("categories", "").split(", ")[0]
    alternatives = alternatives_df[alternatives_df["category"] == category]
    
    return alternatives["product_name"].tolist()[:3] if not alternatives.empty else []

# Function to compute Overall 5-Star Rating
def calculate_final_rating(health_score, ingredient_score, sustainability_score):
    overall_score = (
        0.3 * health_score +
        0.25 * ingredient_score +
        0.15 * sustainability_score
    )
    star_rating = (overall_score / 100) * 5
    
    return round(star_rating, 1)

# Quantum Encoding: Convert Nutrition Data into Quantum State
def quantum_encode_snack_data(product):
    # Extract relevant features (sugar, fat, protein, fiber)
    features = np.array([
        product.get("sugar_100g", 0),
        product.get("saturated-fat_100g", 0),
        product.get("proteins_100g", 0),
        product.get("fiber_100g", 0)
    ])
    
    # Normalize data (0 to 1 range)
    max_value = max(features) if max(features) != 0 else 1
    features = features / max_value
    
    # Create a Quantum Circuit with 4 qubits (one per feature)
    num_qubits = len(features)
    feature_map = ZZFeatureMap(num_qubits)
    
    # Apply feature encoding
    qc = QuantumCircuit(num_qubits)
    qc.append(feature_map, range(num_qubits))
    
    return qc

# Quantum Secure Hashing for Product Ratings
def quantum_secure_hash(product_name, final_rating):
    # Combine product name and rating
    rating_string = f"{product_name}:{final_rating}"
    
    # Classical Hashing (SHA-256)
    classical_hash = hashlib.sha256(rating_string.encode()).hexdigest()
    
    # Quantum Circuit (4 qubits for a simple quantum hash)
    qc = QuantumCircuit(4)
    qc.h(range(4))  # Apply Hadamard gates
    qc.cz(0, 1)  # Add quantum entanglement
    
    # Simulate Quantum Circuit
    backend = Aer.get_backend("statevector_simulator")
    job = execute(qc, backend)
    result = job.result()
    quantum_hash = result.get_statevector().data[:4]  # Extract quantum state

    return classical_hash[:10] + str(quantum_hash)[:10]  # Hybrid Quantum-Classical Hash

# Main function to process a product based on barcode
def process_product(barcode, user_allergies=[]):
    product = fetch_product_details(barcode)
    
    if not product:
        return "Product not found!"

    health_score = calculate_health_score(product)
    ingredient_score = calculate_ingredient_score(product)
    sustainability_score = calculate_sustainability_score(product)
    allergens = check_allergens(product, user_allergies)
    alternatives = find_alternative_products(product)
    final_rating = calculate_final_rating(health_score, ingredient_score, sustainability_score)
    
    # Quantum Encoding of Snack Data
    quantum_circuit = quantum_encode_snack_data(product)
    
    # Quantum Secure Hashing
    q_hash = quantum_secure_hash(product.get("product_name", "Unknown"), final_rating)

    return {
        "Product Name": product.get("product_name", "Unknown"),
        "Health Score": health_score,
        "Ingredient Score": ingredient_score,
        "Sustainability Score": sustainability_score,
        "Allergens": allergens,
        "Alternative Products": alternatives,
        "Final Rating (Stars)": final_rating,
        "Quantum Secure Hash": q_hash,
        "Quantum Circuit": quantum_circuit
    }

if _name_ == '_main_':
    app.run(debug=True)
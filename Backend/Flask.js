// JavaScript file to interact with Flask API

// URL of the Flask backend API
const API_URL = "http://localhost:5000/process_product";

// Function to fetch product details using barcode
async function fetchProductDetails(barcode, userAllergies = []) {
  const requestBody = {
    barcode: barcode,
    user_allergies: userAllergies
  };

  try {
    // Make a POST request to the Flask API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    // Parse the JSON response
    const data = await response.json();

    if (response.ok) {
      // Display the product details
      console.log("Product details:", data);
      displayProductDetails(data);
    } else {
      // Handle error (Product not found)
      console.error("Error:", data);
      alert(data.message || "An error occurred while fetching product details.");
    }
  } catch (error) {
    // Handle any network or other errors
    console.error("Network error:", error);
    alert("Failed to fetch product details. Please try again.");
  }
}

// Function to display the product details on the webpage
function displayProductDetails(data) {
  const productDetailsContainer = document.getElementById("product-details");

  productDetailsContainer.innerHTML = `
    <h3>${data["Product Name"]}</h3>
    <p><strong>Health Score:</strong> ${data["Health Score"]}</p>
    <p><strong>Ingredient Score:</strong> ${data["Ingredient Score"]}</p>
    <p><strong>Sustainability Score:</strong> ${data["Sustainability Score"]}</p>
    <p><strong>Allergens:</strong> ${data["Allergens"]}</p>
    <p><strong>Alternative Products:</strong> ${data["Alternative Products"].join(", ")}</p>
    <p><strong>Final Rating (Stars):</strong> ${data["Final Rating (Stars)"]}</p>
    <p><strong>Quantum Secure Hash:</strong> ${data["Quantum Secure Hash"]}</p>
  `;

  // You can also display the quantum circuit if needed
  // displayQuantumCircuit(data["Quantum Circuit"]);
}

// Call the function to fetch product details when a button is clicked
document.getElementById("get-product-details-btn").addEventListener("click", () => {
  const barcode = document.getElementById("barcode-input").value;
  const userAllergies = document.getElementById("allergies-input").value.split(", ");
  
  if (barcode) {
    fetchProductDetails(barcode, userAllergies);
  } else {
    alert("Please enter a valid barcode.");
  }
});
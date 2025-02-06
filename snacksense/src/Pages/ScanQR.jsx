import { React, useState } from "react";
import "../Assets/CSS/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../Api";
import { useNavigate } from "react-router-dom";
import Barcode from "react-qr-barcode-scanner";
import { toast, ToastContainer } from "react-toastify";

export default function ScanQR(props) {
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  function extractAndParseJson(inputString) {
    try {
      // Find the starting position of '{'
      const startIndex = inputString.indexOf("{");
      if (startIndex === -1) {
        return { error: "No JSON object found in the input" };
      }

      // Find the ending position of ```
      const endIndex = inputString.indexOf("```", startIndex);
      const jsonString =
        endIndex !== -1
          ? inputString.substring(startIndex, endIndex) // Extract until ```
          : inputString.substring(startIndex); // If no ```, take the rest

      // Parse JSON
      return JSON.parse(jsonString);
    } catch (error) {
      return { error: "Invalid JSON format", details: error.message };
    }
  }
  const handleScan = async () => {
    try {
      toast.dismiss();
      toast('Processing user details and product details....');
      const resp = await axios.get(
        `https://world.openfoodfacts.org/api/v3/product/${barcode}.json`
      );
      setPrompt(`You are a health and nutrition expert. Given the following product details, analyze with proper formulas and must return the results exactly as the output format:  

### *Product Details:* ${resp} 

- *User Preferences & Health Metrics:*  
  - Diet Type: {Vegan/Keto/Diabetic/etc.}  
  - Health Concerns: {Diabetes/Hypertension/Weight Loss/etc.}  
  - Allergies: {Peanuts, Gluten, Dairy, etc.}  

### *Required Analysis (Return the results in structured JSON format):*  
 *AI Health Score (0-100 scale)*:  
   - Analyze the ingredients and nutrition data.  
   - Adjust the score based on harmful and beneficial factors.  
   - Consider user-specific health conditions (e.g., high sugar is bad for diabetics).  
   
  *Ingredient Classification:*  
   - Categorize each ingredient as:  
     - 🟢 *Beneficial* (Good for health)  
     - 🟡 *Neutral* (No major impact)  
     - 🔴 *Harmful* (Linked to health risks)  
   - Provide a brief explanation for each classification.  

 *Allergen Alerts:*  
   - Highlight any allergens present in the ingredients list.  
   - Compare with user preferences and flag any risky ingredients.  

 *Sustainability Insights:*  
   - Rate environmental impact based on packaging & processing.  
   - Provide a *Sustainability Score (0-100)* where 100 = Most Eco-friendly.  

 *Personalized Recommendations:*  
   - Suggest healthier alternatives based on user preferences.  
   - Ensure similar taste but better nutritional value.  

 *Overall Star Rating (0-5 stars):*  
   - Combine all factors (Health Score, Ingredients, Allergens, Sustainability, Recommendations).  
   - Normalize into a *5-star rating system* for easy user understanding.  

### *Output Format (JSON Example):*  json
{
  AI_Health_Score: 70,
  Ingredient_Classification: {
    Oats: {
      Classification: "🟢 Beneficial",
      Explanation: "Good source of fiber, which aids digestion and can help regulate blood sugar levels.",
    },
    "Wheat Flour": {
      Classification: "🟡 Neutral",
      Explanation: "Provides carbohydrates for energy but can be high in refined carbohydrates, depending on the type of wheat flour used. Whole wheat flour would be more beneficial.",
    },
    "Brown Sugar": {
      Classification: "🟡 Neutral",
      Explanation: "Provides sweetness but is a refined sugar; moderation is key. Consider alternatives like maple syrup or stevia.",
    },
    "Vegetable Oil": {
      Classification: "🟡 Neutral",
      Explanation: "Provides fat, but the type of oil significantly impacts health. Unsaturated fats are healthier than saturated or trans fats. Specification needed.",
    },
    "Baking Soda": {
      Classification: "🟡 Neutral",
      Explanation: "Baking agent; generally safe in small amounts.",
    },
    Salt: {
      Classification: "🟡 Neutral",
      Explanation: "Essential in small amounts, but excessive consumption can be harmful. Moderation is key.",
    },
    Cinnamon: {
      Classification: "🟢 Beneficial",
      Explanation: "Rich in antioxidants, may help regulate blood sugar levels.",
    },
  },
  Sustainability_Score: 65,
  Personalized_Recommendations: [
    {
      Recommendation: "Oatmeal with berries and nuts",
      Reason: "Provides fiber, antioxidants, and healthy fats, replacing refined carbohydrates and added sugar.",
    },
    {
      Recommendation: "Whole wheat crackers with avocado",
      Reason: "Replaces refined grains with whole grains, adds healthy fats and fiber.",
    },
  ],
  Overall_Star_Rating: 4,
};

`);
      const openAPI = await axios.post("/openAI/generate", { prompt });
      const jsonOpenAPI = extractAndParseJson(
        openAPI.data.message.response.candidates[0].content.parts[0].text
      );
      props.setProduct(jsonOpenAPI);
      navigate("/results");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      props.setProduct(null);
    }
  };
  return (
    <div className="bg-cover d-flex flex-column align-items-center justify-content-center mt-10">
      <ToastContainer position="top-center" theme="light" />
      <main className="container text-center py-1 overlay-content">
        {/* Welcome Section */}
        <section className="text-white mb-2 welcome-section">
          <h1 className="display-4 fw-bold">
            Welcome! Let's make healthier snack choices!
          </h1>
          <p className="lead">
            Your health insights, diet plans, and barcode scanner are just a tap
            away
          </p>
          <div className="bg-white rounded mx-auto w-100 max-w-3xl h-48"></div>
        </section>
        <section className="scan-box mx-auto p-4 border rounded shadow-lg d-flex flex-column align-items-center">
          <h2 className="h4 fw-bold">Scan Your Snack</h2>
          <p>Scan the barcode of a product to get health insights!</p>

          {/* Barcode Scanner */}
          {scanning && (
            <Barcode
              width={300}
              height={250}
              onUpdate={(err, result) => {
                if (result) {
                  setBarcode(result.text);
                  setScanning(false);
                }
              }}
            />
          )}

          <div className="scan-button-container mt-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setScanning(true)}
            >
              Start Scanning
            </button>
            <input
              type="text"
              value={barcode}
              className="form-control mt-2"
              readOnly
            />
            <button
              className="btn btn-warning btn-lg mt-2"
              onClick={handleScan}
            >
              Analyze Product
            </button>
          </div>
        </section>
        
      </main>
    </div>
  );
}

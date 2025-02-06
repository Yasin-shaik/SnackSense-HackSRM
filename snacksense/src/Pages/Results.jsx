import React, { useState, useEffect } from "react";
import { Container, Typography, List, ListItem, ListItemText, Box } from "@mui/material";
// import res from "../Assets/Images/res.jpg";

const SpeedometerStars = ({ rating }) => {
  const [currentAngle, setCurrentAngle] = useState(90);

  useEffect(() => {
    const targetAngle = -90 + (rating - 1) * 45;
    let current = -90;
    const interval = setInterval(() => {
      if (current < targetAngle) {
        current += 2;
        setCurrentAngle(current);
      } else {
        clearInterval(interval);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [rating]);

  return (
    <Box className="speedometer-container">
      <svg width="300" height="180" viewBox="0 0 300 180">
        {[...Array(8)].map((_, index) => {
          const angle = (-90 + index * 45) * (Math.PI / 180);
          const x = 150 + 90 * Math.sin(angle);
          const y = 150 - 90 * Math.cos(angle);
          return (
            <text
              key={index}
              x={x}
              y={y}
              fontSize="30"
              fill={index < rating ? "#FFD700" : "#ccc"}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              ★
            </text>
          );
        })}
        <line
          x1="150"
          y1="150"
          x2={150 + 80 * Math.sin(currentAngle * (Math.PI / 180))}
          y2={150 - 80 * Math.cos(currentAngle * (Math.PI / 180))}
          stroke="red"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
};

const jsonData = {
  AI_Health_Score: 70,
  Ingredient_Classification: {
    Oats: { Classification: "🟢 Beneficial", Explanation: "Good source of fiber." },
    "Wheat Flour": { Classification: "🟡 Neutral", Explanation: "Provides carbohydrates for energy." },
    Cinnamon: { Classification: "🟢 Beneficial", Explanation: "Rich in antioxidants, may help regulate blood sugar." },
  },
  Sustainability_Score: 65,
  Personalized_Recommendations: [
    { Recommendation: "Oatmeal with berries", Reason: "Provides fiber and antioxidants." },
    { Recommendation: "Whole wheat crackers with avocado", Reason: "Adds healthy fats and fiber." },
  ],
  Overall_Star_Rating: 4,
};

const Results = ({ product = jsonData }) => {
  return (
    <Box
      sx={{
        // backgroundImage: `url(${res})`,
        
        backgroundSize: "cover",
        backdropFilter: "blur(100%)",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <Container maxWidth="md" className="results-container">
        <Typography variant="h3" className="title">📊 Barcode Scan Results</Typography>

        <Typography variant="h5" className="score">✅ AI Health Score: {product.AI_Health_Score}</Typography>

        <Typography variant="h5" className="sub-title">🥣 Ingredient Classification</Typography>
        <List className="ingredient-list">
          {Object.entries(product.Ingredient_Classification).map(([key, value]) => (
            <ListItem key={key} className="ingredient-item">
              <ListItemText primary={<strong>{key}: {value.Classification}</strong>} secondary={value.Explanation} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" className="score">🌍 Sustainability Score: {product.Sustainability_Score}</Typography>

        <Typography variant="h5" className="sub-title">🍽 Personalized Recommendations</Typography>
        <List className="recommendation-list">
          {product.Personalized_Recommendations.map((item, index) => (
            <ListItem key={index} className="recommendation-item">
              <ListItemText primary={<strong>{item.Recommendation}</strong>} secondary={item.Reason} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" className="sub-title">⭐ Overall Star Rating</Typography>
        <SpeedometerStars rating={product.Overall_Star_Rating} />
      </Container>
    </Box>
  );
};

export default Results;

/* Add CSS inside your main CSS file or inject it in the component */
const styles = `
.results-container {
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 40px auto;
  max-width: 800px;
}
.title {
  color: #007BFF;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
  backdrop-blur: 50%;
}
.score {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
}
.sub-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  text-align: center;
  color: #007BFF;
  padding-bottom: 10px;
  border-bottom: 2px solid #007BFF;
}
.ingredient-list, .recommendation-list {
  padding: 15px;
  margin-top: 15px;
  border-radius: 5px;
  background: rgba(249, 249, 249, 0.9);
}
.ingredient-item, .recommendation-item {
  transition: background 0.3s ease, transform 0.2s ease;
  padding: 10px 15px;
  border-radius: 5px;
}
.ingredient-item:hover, .recommendation-item:hover {
  background: #e0f7fa;
  transform: scale(1.02);
}
.speedometer-container {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
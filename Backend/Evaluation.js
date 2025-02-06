import { ModelServiceClient } from '@google-cloud/aiplatform';

// Initialize Vertex AI Client
const client = new ModelServiceClient();

async function getModelAccuracy() {
  const project = 'snackSense';
  const location = 'india-south'; 
  const modelId = 'gemini-1.5-turbo'; // Replace with your trained model ID

  const modelName = `projects/${project}/locations/${location}/models/${modelId}`;

  try {
    // Fetch model evaluations
    const [evaluations] = await client.listModelEvaluations({ parent: modelName });

    if (!evaluations.length) {
      console.log('No evaluations found for this model.');
      return;
    }

    // Extract accuracy from the latest evaluation
    const latestEvaluation = evaluations[0];
    const metrics = latestEvaluation.metrics;
    
    console.log('Model Evaluation Metrics:', metrics);
    console.log('Accuracy:', metrics.accuracy || 'N/A');
    console.log('F1 Score:', metrics.f1Score || 'N/A');

  } catch (error) {
    console.error('Error fetching model evaluations:', error);
  }
}

// Run the function
getModelAccuracy();

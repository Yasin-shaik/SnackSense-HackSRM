import { init, GenerationServiceClient } from '@google-cloud/aiplatform';

// Initialize Vertex AI with your project and region
init({
  project: 'snackSense',
  location: 'india-south'
});

// Create a client for the Text Generation model
const generationClient = new GenerationServiceClient();

async function fineTuneGemini() {
  const request = {
    baseModel: 'gemini-pro',
    trainingData: 'gs://your-bucket-name/data.jsonl',
    outputModelDisplayName: 'fine-tuned-gemini'
  };

  try {
    // Start fine-tuning
    const [operation] = await generationClient.fineTune(request);
    console.log('Fine-tuning started:', operation.name);
    
    // Wait for the fine-tuning process to complete
    const [response] = await operation.promise();
    console.log('Fine-tuned model created:', response);
  } catch (error) {
    console.error('Error fine-tuning model:', error);
  }
}

// Run the function
fineTuneGemini();

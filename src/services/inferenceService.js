import * as ort from 'onnxruntime-web';

// Configure ONNX Runtime to use WASM
ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";

export class YOLOInferenceService {
  constructor(modelPath = '/models/best.onnx', inputSize = 224) {
    this.session = null;
    this.modelPath = modelPath;
    this.inputSize = inputSize;
  }

  async loadModel() {
    try {
      this.session = await ort.InferenceSession.create(this.modelPath);
      console.log('YOLOv8 Model loaded successfully');
    } catch (e) {
      console.error('Failed to load YOLOv8 model:', e);
      throw new Error('Failed to load local model. Please ensure /public/models/best.onnx exists.');
    }
  }

  async runInference(imageFile) {
    if (!this.session) {
      await this.loadModel();
    }

    // 1. Preprocess image
    const tensor = await this.preprocess(imageFile);

    // 2. Run inference
    const feeds = {};
    feeds[this.session.inputNames[0]] = tensor;
    
    const results = await this.session.run(feeds);
    const output = results[this.session.outputNames[0]];

    // 3. Postprocess (Softmax & Argmax for classification)
    return this.postprocess(output.data);
  }

  async preprocess(file) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = this.inputSize;
        canvas.height = this.inputSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context failed');

        ctx.drawImage(img, 0, 0, this.inputSize, this.inputSize);
        const imageData = ctx.getImageData(0, 0, this.inputSize, this.inputSize);
        const { data } = imageData;

        // Convert to Float32 and Transpose [H, W, 3] -> [1, 3, H, W]
        const float32Data = new Float32Array(3 * this.inputSize * this.inputSize);
        
        for (let i = 0; i < this.inputSize * this.inputSize; i++) {
          // Normalize 0-255 -> 0.0-1.0
          float32Data[i] = data[i * 4] / 255.0; // R
          float32Data[this.inputSize * this.inputSize + i] = data[i * 4 + 1] / 255.0; // G
          float32Data[2 * this.inputSize * this.inputSize + i] = data[i * 4 + 2] / 255.0; // B
        }

        const tensor = new ort.Tensor('float32', float32Data, [1, 3, this.inputSize, this.inputSize]);
        resolve(tensor);
      };
      img.src = URL.createObjectURL(file);
    });
  }

  postprocess(data) {
    // Find index of max value
    let maxProb = -Infinity;
    let maxIndex = -1;

    for (let i = 0; i < data.length; i++) {
      if (data[i] > maxProb) {
        maxProb = data[i];
        maxIndex = i;
      }
    }

    // Map index to class name (Paddy Doctor classes)
    const classes = [
      'Bacterial Leaf Blight', 'Bacterial Leaf Streak', 'Bacterial Panicle Blight',
      'Blast', 'Brown Spot', 'Dead Heart', 'Downy Mildew', 'Hispa', 'Normal', 'Tungro'
    ];

    return {
      disease: classes[maxIndex] || 'Unknown',
      confidence: maxProb, // Note: Raw logits might need softmax if model doesn't include it
      treatment: 'Consult an expert for specific treatment.' // Placeholder
    };
  }
}

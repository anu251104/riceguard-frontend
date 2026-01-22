import os
from ultralytics import YOLO
import kaggle

# 1. Setup and Configuration
DATASET_NAME = "paddydoctor/paddy-doctor-diseases-small" # Example dataset, user might need to adjust
DOWNLOAD_PATH = "./paddy_dataset"
MODEL_TYPE = "yolov8n-cls.pt" # Classification model (nano version for speed)
EPOCHS = 20
IMG_SIZE = 224

def download_dataset():
    """Downloads the Paddy Doctor dataset from Kaggle."""
    print(f"Downloading {DATASET_NAME} from Kaggle...")
    
    # Ensure kaggle.json is present or env vars are set
    if not os.path.exists(os.path.expanduser('~/.kaggle/kaggle.json')) and 'KAGGLE_KEY' not in os.environ:
        print("Error: Kaggle API credentials not found. Please upload kaggle.json to ~/.kaggle/ or set KAGGLE_USERNAME and KAGGLE_KEY environment variables.")
        return False

    try:
        kaggle.api.authenticate()
        kaggle.api.dataset_download_files(DATASET_NAME, path=DOWNLOAD_PATH, unzip=True)
        print("Dataset downloaded and extracted successfully.")
        return True
    except Exception as e:
        print(f"Failed to download dataset: {e}")
        return False

def train_model():
    """Trains the YOLOv8 model."""
    print(f"Starting training with {MODEL_TYPE}...")
    
    # Load a model
    model = YOLO(MODEL_TYPE)  # load a pretrained model (recommended for training)

    # Train the model
    # Note: 'data' argument for classification should point to the folder containing train/test/val folders
    # Adjust 'data' path based on actual dataset structure after download
    results = model.train(
        data=DOWNLOAD_PATH, 
        epochs=EPOCHS, 
        imgsz=IMG_SIZE,
        project="rice_guard_training",
        name="yolov8_paddy"
    )
    
    print("Training completed.")
    print(f"Best model saved at: {results.save_dir}/weights/best.pt")
    
    # Export the model to ONNX for web use (optional)
    success = model.export(format="onnx")
    print(f"Model exported to ONNX: {success}")

if __name__ == "__main__":
    # Create download directory
    if not os.path.exists(DOWNLOAD_PATH):
        os.makedirs(DOWNLOAD_PATH)

    # Execute workflow
    if download_dataset():
        train_model()
    else:
        print("Skipping training due to dataset download failure.")

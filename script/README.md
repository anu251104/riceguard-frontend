# YOLOv8 Training Guide for RiceGuard AI

This directory contains scripts to train a custom YOLOv8 model on the Paddy Doctor dataset.

## Prerequisites

Since training deep learning models requires significant computational resources (GPU), we recommend running this script on **Google Colab** or a local machine with a CUDA-enabled GPU.

## How to Train on Google Colab

1.  **Open Google Colab**: [https://colab.research.google.com/](https://colab.research.google.com/)
2.  **Create a New Notebook**.
3.  **Enable GPU**: Go to `Runtime` > `Change runtime type` > Select `T4 GPU`.
4.  **Install Dependencies**:
    ```python
    !pip install ultralytics kaggle
    ```
5.  **Setup Kaggle Credentials**:
    - Upload your `kaggle.json` file to the Colab session.
    - Move it to the correct location:
      ```python
      !mkdir -p ~/.kaggle
      !cp kaggle.json ~/.kaggle/
      !chmod 600 ~/.kaggle/kaggle.json
      ```
6.  **Run the Training Script**:
    - Copy the content of `train_yolov8.py` into a cell and run it.
    - OR upload the script and run: `!python train_yolov8.py`

## Integration

Once trained, you will get a `best.pt` (PyTorch) and `best.onnx` (ONNX) file.

### Option 1: Host as API (Recommended)
1.  Deploy the model using **Roboflow**, **Hugging Face Spaces**, or a custom **FastAPI/Flask** server.
2.  Update the frontend to call your API endpoint instead of the Gemini AI.

### Option 2: In-Browser Inference (Advanced)
1.  Use the `best.onnx` file.
2.  Use `onnxruntime-web` in the React app to run the model directly in the browser.
    *(Note: This requires additional frontend configuration and may be heavy for mobile devices)*.

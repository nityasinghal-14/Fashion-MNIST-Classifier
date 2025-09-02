import cv2
import numpy as np


def preprocess_external_image(img, target_size=28):
    # Resize big first
    img = cv2.resize(img, (224, 224), interpolation=cv2.INTER_AREA)
    # Threshold (background removal)
    _, img = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    # Resize down to 28x28
    img = cv2.resize(img, (target_size, target_size), interpolation=cv2.INTER_AREA)
    # Invert if background is white
    if img.mean() > 127:
        img = 255 - img
    # Normalize
    img_norm = img.astype(np.float32) / 255.0
    return img_norm.reshape(1, -1), img_norm

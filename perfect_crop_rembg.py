from rembg import remove
import cv2
import numpy as np
import os

out_dir = "src/assets/beans"
os.makedirs(out_dir, exist_ok=True)

# 1. Use rembg to remove the background entirely
# Read the original image with cv2
input_path = "src/assets/coffee-beans.jpg"
img = cv2.imread(input_path)

print("Removing background with rembg...")
# rembg expects input image in BGR format and returns a BGRA image
bg_removed = remove(img)

# Save intermediate bg removed for debugging
cv2.imwrite("src/assets/beans/bg_removed.png", bg_removed)
print("Background removed. Finding individual beans...")

# 2. Extract discrete beans
# Extract alpha channel
alpha = bg_removed[:, :, 3]

# Binarize the alpha channel
_, binary = cv2.threshold(alpha, 127, 255, cv2.THRESH_BINARY)

# Find discrete blobs (contours)
contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Sort by size to get the actual beans, not random noise
contours = sorted(contours, key=cv2.contourArea, reverse=True)

count = 1
for contour in contours:
    if count > 12:
        break
        
    area = cv2.contourArea(contour)
    if area < 5000: # Ignore tiny artifacts
        continue
        
    # Get bounding box for this bean
    x, y, w, h = cv2.boundingRect(contour)
    
    # Create an empty totally transparent image of the same size as the bounding box
    bean_crop = np.zeros((h, w, 4), dtype=np.uint8)
    
    # Create a mask just for this specific contour (to ignore neighbors that enter the bounding box)
    mask = np.zeros_like(alpha)
    cv2.drawContours(mask, [contour], -1, 255, thickness=cv2.FILLED)
    
    # Crop the specific region of the mask and the image
    mask_crop = mask[y:y+h, x:x+w]
    img_crop = bg_removed[y:y+h, x:x+w]
    
    # Only keep the pixels that belong to THIS specific contour
    # Apply the mask to the alpha channel of the crop
    for c in range(4):
        bean_crop[:, :, c] = np.where(mask_crop == 255, img_crop[:, :, c], 0)
        
    filename = f"{out_dir}/bean{count}.png"
    cv2.imwrite(filename, bean_crop)
    print(f"Saved {filename} (Area: {area}, Size: {w}x{h})")
    count += 1

print(f"Successfully extracted {count-1} perfect beans!")

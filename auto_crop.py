import cv2
import numpy as np
import os

# Create output directory
out_dir = "src/assets/beans"
os.makedirs(out_dir, exist_ok=True)

# Read the image
# Note: cv2 uses BGR channel order
img = cv2.imread("src/assets/coffee-beans.jpg")
if img is None:
    print("Could not read image")
    exit(1)

# Convert to BGRA to add alpha channel
img_bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

# Convert to HSV for easy color thresholding
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# The background is mostly checkerboard (gray/white) -> low saturation
# The coffee beans are brown -> higher saturation
# Let's create a mask where saturation is above a certain threshold
# And value is above very dark shadows (to avoid masking out dark bean parts) but shadows have some saturation.
# A good heuristic for coffee beans is simply looking for higher red than blue
# Let's extract B, G, R channels
b, g, r = cv2.split(img)

# r/b difference as float
diff = r.astype(np.int16) - b.astype(np.int16)

# Create mask based on the diff
# If red is significantly higher than blue, it's a warm color (coffee bean)
# If diff < 15, it's likely background (gray/white checkerboard)
mask = diff > 15

# Also, very bright white pixels are background
bright_mask = (r > 200) & (g > 200) & (b > 200)
mask = mask & (~bright_mask)

# Convert boolean mask to uint8
mask = mask.astype(np.uint8) * 255

# Apply morphological operations to clean up the mask (remove noise, fill holes)
kernel = np.ones((5,5), np.uint8)
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

# Apply mask to alpha channel
img_bgra[:, :, 3] = mask

# Wait, the problem with fixed bounding boxes is they might cut through neighboring beans
# Let's just find all discrete contours (beans) in the mask and extract the biggest ones!
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Sort contours by area descending
contours = sorted(contours, key=cv2.contourArea, reverse=True)

# Take the top 12 largest contours
count = 1
for i, contour in enumerate(contours):
    if count > 12:
        break
        
    area = cv2.contourArea(contour)
    # Ignore tiny noise
    if area < 5000:
        continue
        
    # Get bounding rectangle
    x, y, w, h = cv2.boundingRect(contour)
    
    # Extract the crop using the bounding box
    crop = img_bgra[y:y+h, x:x+w]
    
    # Save it
    filename = f"{out_dir}/bean{count}.png"
    cv2.imwrite(filename, crop)
    print(f"Saved {filename} (Area: {area}, Size: {w}x{h})")
    count += 1

print(f"Successfully extracted {count-1} perfect beans!")

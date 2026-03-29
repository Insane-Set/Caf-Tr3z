from PIL import Image
import os

src = Image.open("src/assets/coffee-beans.jpg").convert("RGBA")
pixels = src.load()
width, height = src.size

# We will create a perfect mask using color difference (brown vs gray)
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        
        # Check if the pixel neutral (grayscale)
        # Background is checkered gray/white -> R, G, B are almost identical.
        # Coffee beans are brown -> R is significantly larger than B.
        color_diff = int(r) - int(b)
        
        # If it's a dark shadow, it might be close to black, but r-b is still > 10 usually
        # If it's a highlight, it might be white, but usually warm white.
        # But wait, true black shadows might have r-b < 15. Let's do a combined check.
        is_background = False
        
        if color_diff < 15 and max(r,g,b) > 100:
            is_background = True
        
        # Extra check for pure white/light gray exactly
        if abs(r-g) < 10 and abs(g-b) < 10 and r > 150:
             is_background = True

        if is_background:
            pixels[x, y] = (255, 255, 255, 0)
        else:
            # Keep pixel, apply slight edge smoothing if needed
            pixels[x, y] = (r, g, b, 255)

# Wait, instead of hardcropping with squares, we can find bounding boxes automatically!
# Or we can just use the manual ones we already know, but with this perfect mask!

# Let's adjust the manual boxes slightly to be perfectly tight
beans = {
    "bean1": (1350, 200, 2100, 750),    # Top-right large bean
    "bean2": (600, 500, 1300, 1000),     # Mid-left large bean
    "bean3": (1350, 750, 2050, 1350),    # Right-center large bean
    "bean4": (700, 1200, 1500, 1850),    # Center large bean (biggest)
    "bean5": (200, 1650, 1050, 2200),    # Bottom-left large bean
    "bean6": (50, 400, 450, 750),        # Far-left round bean
    "bean7": (600, 200, 950, 500),       # Top-center pair area
    "bean8": (1700, 1150, 2200, 1600),   # Right side medium bean
    "bean9": (350, 1100, 650, 1400),     # Left small bean
    "bean10": (2100, 450, 2400, 700),    # Far-right small bean
    "bean11": (1100, 1900, 1400, 2150),  # Bottom center small
    "bean12": (1800, 1800, 2200, 2100),  # Bottom right blurred
}

out_dir = "src/assets/beans"
os.makedirs(out_dir, exist_ok=True)

# Save the full masked image just for debugging
src.save("src/assets/beans/full_masked.png")

# Now crop tightly
for name, box in beans.items():
    cropped = src.crop(box)
    
    # Auto-tighten the bounding box to remove empty transparent space
    bbox = cropped.getbbox()
    if bbox:
        cropped = cropped.crop(bbox)
        
    cropped.save(f"{out_dir}/{name}.png", "PNG")
    print(f"Saved {name}")

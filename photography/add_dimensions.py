import os
from PIL import Image

directory = "photography"

for filename in os.listdir(directory):
    # Check if it's an image file
    if filename.lower().endswith((".jpg", ".jpeg", ".png")):
        filepath = os.path.join(directory, filename)
        try:
            # Open the image and get its dimensions
            img = Image.open(filepath)
            width, height = img.size
            dimensions = f"{width}x{height}"

            # Extract filename without extension
            base, ext = os.path.splitext(filename)

            # Skip files that already have dimensions in the name
            if dimensions in base:
                continue

            # Build the new filename with dimensions
            new_filename = f"{base}_{dimensions}{ext}"

            # Rename the file
            os.rename(filepath, os.path.join(directory, new_filename))
            print(f"Renamed: {filename} -> {new_filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

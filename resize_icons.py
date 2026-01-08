from PIL import Image
import os

source_path = "c:/Users/wseu/Desktop/Code/Google excel delink/icon.png"
base_dir = "c:/Users/wseu/Desktop/Code/Google excel delink"

try:
    img = Image.open(source_path)
    # Resize and save for 128 (main)
    img.resize((128, 128), Image.Resampling.LANCZOS).save(os.path.join(base_dir, "icon128.png"))
    # Resize and save for 48
    img.resize((48, 48), Image.Resampling.LANCZOS).save(os.path.join(base_dir, "icon48.png"))
    # Resize and save for 16
    img.resize((16, 16), Image.Resampling.LANCZOS).save(os.path.join(base_dir, "icon16.png"))
    print("Icons resized successfully")
except Exception as e:
    print(f"Error resizing icons: {e}")

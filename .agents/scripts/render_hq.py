import fitz
import os

doc = fitz.open("attached_assets/Rita_Matar_Portfolio_1785768323500.pdf")
os.makedirs(".agents/outputs/hq", exist_ok=True)

for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(3, 3))
    pix.save(f".agents/outputs/hq/page_{i+1:02d}.jpg")
    print(f"Page {i+1}: {pix.width}x{pix.height} -> .agents/outputs/hq/page_{i+1:02d}.jpg")

doc.close()
print("Done!")

import fitz
import os

doc = fitz.open("attached_assets/Rita_Matar_Portfolio_1785768323500.pdf")
os.makedirs(".agents/outputs/images", exist_ok=True)

count = 0
for page_num in range(doc.page_count):
    page = doc[page_num]
    images = page.get_images(full=True)
    for img_index, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        img_bytes = base_image["image"]
        ext = base_image["ext"]
        filename = f".agents/outputs/images/page{page_num+1:02d}_img{img_index+1:02d}.{ext}"
        with open(filename, "wb") as f:
            f.write(img_bytes)
        count += 1
        print(f"  Saved: {filename} ({len(img_bytes)//1024}KB)")

print(f"\nTotal images extracted: {count}")
doc.close()

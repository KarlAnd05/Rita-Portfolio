import fitz

doc = fitz.open("attached_assets/Rita_Matar_Portfolio_1785768323500.pdf")
print(f"Pages: {doc.page_count}")
print(f"Metadata: {doc.metadata}")
for i, page in enumerate(doc):
    print(f"\n--- Page {i+1} ({page.rect.width:.0f}x{page.rect.height:.0f}) ---")
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    pix.save(f".agents/outputs/page_{i+1:02d}.png")
    text = page.get_text()
    print(text[:2000])
doc.close()

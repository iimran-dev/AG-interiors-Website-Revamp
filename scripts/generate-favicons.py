import os
import base64
from PIL import Image

def generate_favicons():
    emblem_path = os.path.join('public', 'clean-emblem.png')
    emblem = Image.open(emblem_path).convert('RGBA')

    # 1. Multi-resolution favicon.ico (16, 32, 48, 64)
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    emblem.save(os.path.join('public', 'favicon.ico'), format='ICO', sizes=ico_sizes)

    # 2. Standard icon.png (512x512)
    emblem.resize((512, 512), Image.Resampling.LANCZOS).save(
        os.path.join('public', 'icon.png'), format='PNG'
    )

    # 3. Dedicated sizes
    emblem.resize((32, 32), Image.Resampling.LANCZOS).save(
        os.path.join('public', 'icon-32x32.png'), format='PNG'
    )
    emblem.resize((48, 48), Image.Resampling.LANCZOS).save(
        os.path.join('public', 'icon-48x48.png'), format='PNG'
    )
    emblem.resize((192, 192), Image.Resampling.LANCZOS).save(
        os.path.join('public', 'icon-192x192.png'), format='PNG'
    )
    emblem.resize((512, 512), Image.Resampling.LANCZOS).save(
        os.path.join('public', 'icon-512x512.png'), format='PNG'
    )

    # 4. Apple Touch Icon (180x180) on brand luxury ivory canvas (#FAF8F5)
    apple_canvas = Image.new('RGBA', (180, 180), (250, 248, 245, 255))
    apple_emblem = emblem.resize((150, 150), Image.Resampling.LANCZOS)
    apple_canvas.paste(apple_emblem, (15, 15), apple_emblem)
    apple_canvas.save(os.path.join('public', 'apple-touch-icon.png'), format='PNG')
    apple_canvas.save(os.path.join('public', 'apple-icon.png'), format='PNG')

    # 5. icon.svg
    with open(os.path.join('public', 'icon.png'), 'rb') as f:
        b64_png = base64.b64encode(f.read()).decode('utf-8')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,{b64_png}" width="512" height="512" />
</svg>
'''
    with open(os.path.join('public', 'icon.svg'), 'w', encoding='utf-8') as f:
        f.write(svg_content)

    print("Generated all favicon variants in public/")

    # Also copy to src/app for Next.js App Router conventions
    app_dir = os.path.join('src', 'app')
    for filename in ['favicon.ico', 'icon.png', 'apple-icon.png']:
        src_path = os.path.join('public', filename)
        dst_path = os.path.join(app_dir, filename)
        with open(src_path, 'rb') as sf:
            with open(dst_path, 'wb') as df:
                df.write(sf.read())

    print("Copied favicon assets to src/app/")

if __name__ == '__main__':
    generate_favicons()

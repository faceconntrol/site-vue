import requests
import os
from PIL import Image
import io

def download_and_optimize_image(url, save_path, target_size=(800, 600)):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            img = Image.open(io.BytesIO(response.content))
            
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            img.thumbnail(target_size, Image.Resampling.LANCZOS)
            
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            
            img.save(save_path, 'JPEG', quality=85, optimize=True)
            print(f'Успешно сохранено: {save_path}')
            return True
    except Exception as e:
        print(f'Ошибка при обработке {url}: {str(e)}')
        return False

images = {
    'technologies/colorvu.jpg': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80',
    'technologies/acusense.jpg': 'https://images.unsplash.com/photo-1579487785973-74d2ca7d6d68?w=800&q=80',
    'technologies/darkfighter.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    'technologies/deep-learning.jpg': 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
    'technologies/tandemvu.jpg': 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80',
    'technologies/smart-ir.jpg': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    'technologies/hik-connect.jpg': 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    'technologies/smart-home-security.jpg': 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    'technologies/smart-environmental.jpg': 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80'
}

def main():
    base_dir = 'public/images'
    for path, url in images.items():
        full_path = os.path.join(base_dir, path)
        print(f'Загрузка {url} в {full_path}...')
        download_and_optimize_image(url, full_path)

if __name__ == '__main__':
    main() 
import os
from pytube import YouTube

def download_video(url, save_path):
    try:
        yt = YouTube(url)
        # Выбираем поток с лучшим качеством видео
        video = yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first()
        
        # Создаем директорию, если она не существует
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        
        # Загружаем видео
        video.download(filename=save_path)
        print(f'Успешно загружено: {save_path}')
        return True
    except Exception as e:
        print(f'Ошибка при загрузке {url}: {str(e)}')
        return False

# Словарь с URL видео и путями для сохранения
videos = {
    'ColorVu': {
        'url': 'https://www.youtube.com/watch?v=2kbrsaKoAbU',
        'path': 'public/videos/technologies/colorvu.mp4'
    },
    'AcuSense': {
        'url': 'https://www.youtube.com/watch?v=q9RCqJmz0GE',
        'path': 'public/videos/technologies/acusense.mp4'
    },
    'Darkfighter': {
        'url': 'https://www.youtube.com/watch?v=k0Fi-l1B1hY',
        'path': 'public/videos/technologies/darkfighter.mp4'
    },
    'Deep Learning': {
        'url': 'https://www.youtube.com/watch?v=FT3P1pkZd44',
        'path': 'public/videos/technologies/deep-learning.mp4'
    },
    'TandemVu': {
        'url': 'https://www.youtube.com/watch?v=v8_7dW_JaE0',
        'path': 'public/videos/technologies/tandemvu.mp4'
    },
    'Smart IR': {
        'url': 'https://www.youtube.com/watch?v=I8IDtgXiU5A',
        'path': 'public/videos/technologies/smart-ir.mp4'
    }
}

def main():
    for name, info in videos.items():
        print(f'Загрузка видео {name}...')
        download_video(info['url'], info['path'])

if __name__ == '__main__':
    main() 
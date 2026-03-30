import os
from googleapiclient.discovery import build
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

def get_youtube_client():
    return build('youtube', 'v3', developerKey=os.getenv('YOUTUBE_API_KEY'))

def search_shorts(topic, max_results=50):
    youtube = get_youtube_client()
    
    request = youtube.search().list(
        part='snippet',
        q=topic + ' shorts',
        type='video',
        videoDuration='short',
        maxResults=max_results,
        order='viewCount'
    )
    response = request.execute()

    video_ids = [item['id']['videoId'] for item in response['items']]
    
    stats_request = youtube.videos().list(
        part='statistics',
        id=','.join(video_ids)
    )
    stats_response = stats_request.execute()
    stats_dict = {item['id']: item['statistics'] for item in stats_response['items']}

    
    videos = []
    for item in response['items']:
        video = {
            'video_id': item['id']['videoId'],
            'title': item['snippet']['title'],
            'channel': item['snippet']['channelTitle'],
            'published_at': item['snippet']['publishedAt'],
            'views': int(stats_dict.get(item['id']['videoId'], {}).get('viewCount', 0)),
            'likes': int(stats_dict.get(item['id']['videoId'], {}).get('likeCount', 0)),
            'comments': int(stats_dict.get(item['id']['videoId'], {}).get('commentCount', 0)),
        }
        videos.append(video)
    
    df = pd.DataFrame(videos)
    df['engagement_rate'] = (df['likes'] + df['comments']) / df['views'].replace(0, 1)
    return df

if __name__ == '__main__':
    df = search_shorts('minecraft story shorts')
    print(df.head())
    print(f"Collected {len(df)} videos")
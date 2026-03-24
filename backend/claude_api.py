import anthropic
import os
from dotenv import load_dotenv
from youtube_api import search_shorts
from ml_model import cluster_videos, get_viral_insights

load_dotenv()
client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

def generate_script(topic, viral_insights):
    prompt = f"""
You are a viral YouTube Shorts script writer.

Based on analysis of top performing Shorts in this niche:
- Average views of viral videos: {viral_insights['views']:,.0f}
- Average likes: {viral_insights['likes']:,.0f}
- Average engagement rate: {viral_insights['engagement_rate']:.2%}

Write a 20-30 second script for topic: {topic}

Include:
1. A strong hook in the first sentence
2. Build tension quickly
3. A twist
4. A satisfying ending

Also provide:
- 5 hook options (under 8 words each)
- A short punchy title

Respond in this exact JSON format:
{{
    "script": "your script here",
    "hooks": ["hook1", "hook2", "hook3", "hook4", "hook5"],
    "title": "your title here"
}}
"""
    response = client.messages.create(
        model='claude-sonnet-4-5',
        max_tokens=1024,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return (response.content[0].text)

if __name__ == '__main__':
    topic_string = "Minecraft Horror Stories"
    topic = search_shorts(topic_string)
    df = cluster_videos(topic)
    insights = get_viral_insights(df)
    script = generate_script(topic_string, insights)
    print(script)



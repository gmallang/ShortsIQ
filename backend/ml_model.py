import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.preprocessing import StandardScaler
from youtube_api import search_shorts

def prepare_features(df):
    numerical_cols = ['views', 'likes', 'comments', 'engagement_rate']
    scaler = StandardScaler()
    scaled = scaler.fit_transform(df[numerical_cols])
    return(scaled)

def cluster_videos(df):
    scaled = prepare_features(df)
    model = KMeans(n_clusters=3, random_state=0, n_init=10)
    model.fit(scaled)
    df['cluster'] = model.labels_
    return df

def get_viral_insights(df):
    df = df.groupby("cluster").mean(numeric_only=True)
    max_val = df['views'].idxmax()
    return df.loc[max_val]

if __name__ == '__main__':
    topic = search_shorts("Minecraft horror stories")
    topic = cluster_videos(topic)
    insights = get_viral_insights(topic)
    print(insights)



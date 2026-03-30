from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from database import get_all_scripts, init_db, save_script
from claude_api import generate_script
from youtube_api import search_shorts
from ml_model import get_viral_insights, cluster_videos
import json

load_dotenv()
app = Flask(__name__)
CORS(app)
init_db()


@app.route('/api/health')
def health():
    return jsonify({"status": "running", "message": "ShortsIQ backend is live"})

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.get_json()
    topic = data['topic']
    df = search_shorts(topic)
    df = cluster_videos(df)
    insights = get_viral_insights(df)
    script = generate_script(topic, insights)
    print("SCRIPT OUTPUT:", repr(script))
    clean_script = script.strip().replace('```json', '').replace('```', '').strip()
    script_data = json.loads(clean_script)
    save_script(
    topic,
    "", 
    script_data['script'],
    script_data['title'],
    str(script_data['hooks'])
    )
    return jsonify(script_data)

@app.route('/api/history', methods=['GET'])
def history():
    history_scripts = get_all_scripts()
    return jsonify(history_scripts)

@app.route('/api/insights', methods=['GET'])
def insights():
    query = request.args.get('topic')
    insights_json = get_viral_insights(cluster_videos(search_shorts(query))).to_dict()
    return jsonify(insights_json)

    


if __name__ == '__main__':
    app.run(debug=True)

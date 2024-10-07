from flask import Flask, jsonify, request, send_from_directory
from pymongo import MongoClient
from flask_cors import CORS
import subprocess
import os


app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Connect to MongoDB (replace with your connection string)
client = MongoClient('your connection string')
db = client['livestream_db']
overlays_collection = db['overlays']

# Path to store HLS output
HLS_OUTPUT_DIR = 'hls_output'
if not os.path.exists(HLS_OUTPUT_DIR):
    os.makedirs(HLS_OUTPUT_DIR)


# Route for creating an overlay
@app.route('/api/overlays', methods=['POST'])
def create_overlay():
    data = request.json
    overlay = {
        'text': data['text'],
        'logo_url': data['logo_url'],
        'position': data['position'],
        'size': data['size']
    }
    overlays_collection.insert_one(overlay)
    return jsonify({'message': 'Overlay created successfully!'}), 201

# Route for fetching all overlays
@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    overlays = list(overlays_collection.find({}, {'_id': 0}))
    return jsonify(overlays), 200


@app.route('/hls_output/<path:filename>')
def hls_output(filename):
    return send_from_directory(HLS_OUTPUT_DIR, filename)


# Route for starting the RTSP to HLS stream
@app.route('/start-stream', methods=['POST'])
def start_stream():
    rtsp_url = request.json['rtsp_url']
    # Start the FFmpeg process
    command = [
        'ffmpeg', '-i', rtsp_url,
        '-c:v', 'copy', '-c:a', 'aac',
        '-f', 'hls', '-hls_time', '2',
        '-hls_list_size', '0',
        '-hls_segment_filename', os.path.join(HLS_OUTPUT_DIR, 'segment_%03d.ts'),
        os.path.join(HLS_OUTPUT_DIR, 'output.m3u8')
    ]
    
    subprocess.Popen(command)
    return jsonify({'message': 'Streaming started!'}), 200

if __name__ == '__main__':
    app.run(debug=True)

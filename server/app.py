from flask import Flask, request, jsonify, send_from_directory
import os
import subprocess
from flask_cors import CORS

UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'results'

app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app)  # Enable CORS for React dev server or deployment

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

@app.route('/submit', methods=['POST'])
def submit():
    if 'carrier' not in request.files or 'message' not in request.files:
        return jsonify({'error': 'Missing files'}), 400

    carrier = request.files['carrier']
    message = request.files['message']

    carrier_path = os.path.join(UPLOAD_FOLDER, carrier.filename)
    message_path = os.path.join(RESULT_FOLDER, message.filename)
    output_path = os.path.join(RESULT_FOLDER, f"stego_{carrier.filename}")

    carrier.save(carrier_path)
    message.save(message_path)

    try:
        subprocess.run([
            'python3', 'stego.py',
            'embed',
            carrier_path, message_path, output_path
        ], check=True)

        if not os.path.exists(output_path):
            return jsonify({'error': 'Stego file was not created'}), 500

    except subprocess.CalledProcessError as e:
        print("Stego process failed:", e)
        return jsonify({'error': 'Stego process failed'}), 500

    print("✅ File processed and saved:", output_path)
    return jsonify({
        'message': 'Success',
        'file': f"/files/{os.path.basename(output_path)}",
        'carrier_name': carrier.filename,
        'message_name': message.filename
    })


@app.route('/extract', methods=['POST'])
def extract_hidden():
    if 'carrier' not in request.files:
        return jsonify({'error': 'Missing carrier file'}), 400

    carrier = request.files['carrier']
    start = request.form.get('start')
    length = request.form.get('length')
    mode = request.form.get('mode')

    carrier_path = os.path.join(UPLOAD_FOLDER, carrier.filename)
    carrier.save(carrier_path)

    try:
        result = subprocess.run(
            ['python3', 'stego.py', carrier_path, start, length, mode],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True,
        )
        message = result.stdout.decode('utf-8')
        return jsonify({'message': message})
    except subprocess.CalledProcessError as e:
        print("⚠️ Extraction failed:", e.stderr.decode())
        return jsonify({'error': 'Extraction failed'}), 500


@app.route('/files/<filename>')
def serve_file(filename):
    return send_from_directory(RESULT_FOLDER, filename)

@app.route('/uploads/<filename>')
def serve_uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/list-uploads')
def list_uploads():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return jsonify(files)

# ✅ Serve React frontend from 'dist'
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5000")
    app.run(debug=True)

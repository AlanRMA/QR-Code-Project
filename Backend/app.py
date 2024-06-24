from flask import Flask, request, jsonify, send_file
import os
import qrcode
from mongoclient import MongoObject

app = Flask(__name__)

# Colocar o seu ip para teste em localhost usando o celular.
MYIP = "192.168.15.7"
PORT = "3000"
MONGO_URI = os.getenv('MONGO_URI')
MONGO_DB = os.getenv('MONGO_DB')
MONGO_COLLECTION = os.getenv('MONGO_COLLECTION')

@app.route('/data/', methods=['GET'])
def get_data():
    uuid = request.args.get('uuid')

    if not uuid:
        return jsonify({'error': 'UUID parameter is missing'}), 400

    client = MongoObject(MONGO_URI)
    documents_cursor = client.query(MONGO_DB, MONGO_COLLECTION, {'uuid': uuid})
    
    # Converter o cursor para uma lista e converter ObjectId para string
    documents = [client.convert_objectid(doc) for doc in documents_cursor]

    client.close()

    return jsonify(documents)

@app.route('/create/', methods=['POST'])
def receive_payload():
    data = request.json
    if not data or 'base64' not in data or 'uuid' not in data:
        return jsonify({'error': 'Payload is missing base64 or uuid field'}), 400

    client = MongoObject(MONGO_URI)
    client.add_data(MONGO_DB, MONGO_COLLECTION, data)
    client.close()
    qr_code_string = f"http://{MYIP}:{PORT}/data/?uuid=" + data['uuid']
    img = qrcode.make(qr_code_string)
    img.save("./temp/qrcode.png")
    return send_file('./temp/qrcode.png', mimetype='image/png')

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3000))
    app.run(host='0.0.0.0', port=port)

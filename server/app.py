from pathlib import Path
import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route("/api/save", methods=["POST"])
@cross_origin()
def save_passwords():
    try:
        if request.method == "POST":
            data = request.json
            password = data.get("gen_pass")
            pass_name = data.get("pass_name")
            with open(f"passwords/{pass_name}.txt", "w") as file_text:
                file_text.write(str(password))
        return "Saved"
    except Exception as error:
        return str(error)


@app.route("/api/fetch", methods=["POST", "GET"])
@cross_origin()
def fetch_passwords():
    try:
        lst = []
        if request.method == "POST":
            data = request.json
            passwd_name = data.get("passwd_name")
            with open(f"passwords/{passwd_name}.txt", "r") as file_text:
                file_data = file_text.read()
                return jsonify({"password_title": file_data, "message": "Done"})
        if request.method == "GET":
            for filename in os.listdir("passwords"):
                lst.append(str(filename.replace(".txt", "")))
            return jsonify({"passwords": lst})
    except Exception as error:
        return str(error)


if __name__ == "__main__":
    app.run(debug=True)

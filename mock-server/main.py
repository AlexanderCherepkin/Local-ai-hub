
from flask import Flask, request, jsonify

import requests

app = Flask(__name__)

# API_URL = "https://openrouter.ai/api/v1/chat/completions"
# API_KEY = ""  # ← замени на свой ключ

@app.after_request
def add_cache_headers(response):
    response.headers['Cache-Control'] = 'public, max-age=3600'
    return response


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"error": {"message": "Пустое сообщение"}}), 400

    payload = {
        "model": "openai/gpt-4o",
        "messages": [
            {"role": "user", "content": user_message}
        ]
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        reply = data["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": {"message": str(e)}}), 500


if __name__ == "__main__":
    app.run(debug=True)



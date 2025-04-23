import os
import requests
from flask import Flask,jsonify,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def fetch_call_deatils(call_id):
    url = f"https://api.vapi.ai/call/{call_id}"
    headers = {
        "Authorization": f"Bearer {os.getenv('VITE_VAPI_API_KEY')}"
    }
    response =requests.get(url,headers=headers)
    return response.json()

def fetch_list_calls():
    url = f"https://api.vapi.ai/call"
    headers = {
        "Authorization": f"Bearer {os.getenv('VITE_VAPI_API_KEY')}"
    }
    response =requests.get(url,headers=headers)
    return response.json()


@app.route("/call-details",methods=["GET"])
def get_call_details():
    call_id = request.args.get("call_id")
    if not call_id:
        return jsonify({"error":"Call ID is required"}),400
    try:
        response = fetch_call_deatils(call_id)
        print(response)
        summary = response.get("summary")
        analysis = response.get("analysis")
        return jsonify({"analysis": analysis, "summary":summary}),200
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@app.route("/list-calls")
def get_list_calls():
    response = fetch_list_calls()
    data = []
    for i in response:
        #print("hey :: ",i["analysis"])
        if "structuredData" in i["analysis"]:
             print("hey :: ",i["analysis"]["structuredData"])
             data.append(i["analysis"]["structuredData"])
    return data

if __name__ == "__main__":
    app.run(debug=True)
        
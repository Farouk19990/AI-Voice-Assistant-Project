import datetime
import os
from flask_sqlalchemy import SQLAlchemy
import requests
from flask import Flask,jsonify,request
from flask_cors import CORS
import json
from model import Patient,db;

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# Set up SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///patients.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

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

def get_patient_by_call_id(call_id):
    patient = Patient.query.filter_by(call_id=call_id).first()
    if patient:
        # Return patient info nicely packaged
        return jsonify({
            "email": patient.email,
            "phone": patient.phone,
            "date": patient.call_date.strftime('%d-%m-%Y'),
            "call_id": patient.call_id
        }), 200
    else:
        return jsonify({"error": "Patient not found 🙃"}), 404

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    print('data ',data)
    today = datetime.date.today()
    # Save the new user
    new_patient = Patient(email=data['email'], phone=data['phone'],call_id=data['call_id'],call_date=today)
    db.session.add(new_patient)
    db.session.commit()
    db.session.close()
    return jsonify({'allowed': True})
    
@app.route('/check-patient', methods=['POST'])
def check_patient():
    data = request.get_json()
    today = datetime.date.today()
    print(data,today)
    # Query database if user with this email/phone called today
    patient = Patient.query.filter_by(email=data['email'], phone=data['phone'], call_date=today).first()
    print("before IF ",patient)
    if patient:
        print('### NOT ALLOWED ###')
        return jsonify({'allowed': False})
    print('### ALLOWED ###')
    return jsonify({'allowed': True})


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
             res, status_code = get_patient_by_call_id(i["id"])
             res_json = res.get_json()
             if "error" in res_json: 
                print("res ",res_json)
             else:
                combined_data = { 
                    "structuredData": i["analysis"]["structuredData"], 
                    "patientData": res_json 
                }
                data.append(combined_data)
    return data


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
        
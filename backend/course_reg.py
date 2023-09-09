import sqlite3
import db
import json
from flask import Flask,request
from flask_cors import CORS,cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/password/validate",methods=['POST'])
def passwordValidate():
    print('Function called')
    username=request.json["usn"]
    password=request.json["password"]
    print(username)
    print(password)
    passwd=db.getPasswordbyUsn(username)[0]
    
    if passwd==password:
        return {"success":'true'}
    else:
        return {"success":'fail'}
import sqlite3
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app,resources={r"/password/validate": {"origins": "*"}}, supports_credentials=True)


def connect():
    conn = sqlite3.connect('StudentDB.db')
    return conn

def closeConnection(conn):
    conn.close()

def getPasswordbyUsn(usn):
    con = connect()
    cur = con.cursor()
    cur.execute("SELECT password FROM login WHERE usn = ?", (usn,))
    userPassword = cur.fetchone()
    closeConnection(con)
    return userPassword

@app.route("/password/validate", methods=['POST'])
def passwordValidate():
    request_data = request.json
    username = request_data["usn"]
    password = request_data["password"]
    print(username)
    print(password)
    passwd = getPasswordbyUsn(username)

    if passwd and passwd[0] == password:
        return {"success": True}
    else:
        return {"success": False}

@app.route("/get/sem", methods=['GET'])   
def semByUsn():
    return {"sem":1}
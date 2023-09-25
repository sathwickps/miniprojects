import db
from flask import Flask,request
from flask_cors import CORS,cross_origin


app = Flask(__name__)
CORS(app)

# json should be of the form
# {
#     "username": "123",
#     "password": "123"
# }
@app.route("/password/validate",methods=['POST'])
def passwordValidate():
    username=request.json["usn"]
    password=request.json["password"]
    print(username)
    print(password)
    passwd=db.getPasswordbyUsn(username)[0]   
    print(passwd) 
    if passwd==password:
        return {"success":True}
    else:
        return {"success":False}

@app.route("/admin/password/validate", methods=["POST"])
def adminPasswordValidate():
    username = request.json["username"]
    password = request.json["password"]
    print(username)
    print(password)
    adminPass = db.getAdminPassword(username)[0]
    print(adminPass)
    if adminPass == password:
        return { "success" : True }
    else:
        return { "success" : False }

# json should be of the form
# {
#     "usn": "123",
#     "sem": "1",
#     "subCodes": ["sub_code1", "sub_code2"]
# }
@app.route("/subjects", methods=["POST"])
def addSubjectsByUsn():
    usn = request.json["usn"]
    subCodes = request.json["subCodes"]
    sem = request.json["sem"]
    for subCode in subCodes:
        db.insertIntoStudChoice(subCode, sem, usn)
    return { "success" : True }


# /subjects?sem=2
@app.route("/subjects", methods=["GET"])
def getSubjectBySem():
    sem = request.args.get("sem")    
    compulsorySubjects = db.getSubjectsBySem(sem, 0)
    optionalSubjects = db.getSubjectsBySem(sem, 1)
    return { "compulsorySubjects": compulsorySubjects, "optionalSubjects": optionalSubjects }


#/student?usn=1BY22MC058
@app.route("/student", methods=["GET"])
def getStudentByUsn():
    usn = request.args.get("usn")    
    studentDetails = db.getStudentDetails(usn)
    return { "usn": studentDetails[0], "name": studentDetails[1], "sem": studentDetails[2] }

#/students/subjects?usn=1BY22MC058
@app.route("/student/subjects", methods=["GET"])
def getSubjectsByUsn():
    usn = request.args.get("usn")    
    compulsorySub = db.getSubjectsByUsn(usn, 0)
    optionalSub = db.getSubjectsByUsn(usn, 1)
    return { "compulsorySubjects": compulsorySub, "optionalSubjects": optionalSub }